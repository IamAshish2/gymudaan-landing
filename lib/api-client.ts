// Server-only wrapper around fetch. Everything that hits the Java API goes
// through here so cookie forwarding + token refresh live in one place.

import "server-only"

import type { ApiEnvelope } from "@/lib/types"
import {
  getAuthCookieValues,
  parseAuthSetCookies,
  tryRelayAuthCookies,
  tryClearAuthCookies,
} from "@/lib/auth/cookies"
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/auth/constants"

const getBaseUrl = (): string => {
  const url = process.env.API_BASE_URL

  if (!url) {
    throw new Error(
      "API_BASE_URL environment variable is not set. " +
        "Copy .env.example to .env.local and fill in the value."
    )
  }

  return url
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message)
    this.name = "ApiError"
  }
}

type ApiFetchOptions = RequestInit & {
  json?: unknown
  skipRefresh?: boolean

  // tokens to send instead of reading cookies — only used by the refresh retry
  _retryTokens?: { accessToken: string; refreshToken: string }
}

// login/refresh need the Set-Cookie headers too, not just the data
export type ApiFetchRaw<T> = {
  data: T
  setCookies: string[]
}

// Reused by the initial request, the refresh call, and the post-refresh retry.
const buildRequest = (
  path: string,
  opts: ApiFetchOptions,
  tokens: { accessToken: string | null; refreshToken: string | null }
): [string, RequestInit] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { json, skipRefresh: _skip, _retryTokens: _rt, ...rest } = opts

  const headers = new Headers(rest.headers)

  if (json !== undefined) {
    headers.set("Content-Type", "application/json")
  }

  const cookieParts: string[] = []

  if (tokens.accessToken)
    cookieParts.push(`${ACCESS_TOKEN_COOKIE}=${tokens.accessToken}`)

  if (tokens.refreshToken)
    cookieParts.push(`${REFRESH_TOKEN_COOKIE}=${tokens.refreshToken}`)

  if (cookieParts.length) {
    headers.set("Cookie", cookieParts.join("; "))
  }

  const init: RequestInit = {
    ...rest,
    headers,
    ...(json !== undefined ? { body: JSON.stringify(json) } : {}),
  }

  return [`${getBaseUrl()}${path}`, init]
}

// Fires the request and returns data + any Set-Cookie headers. On 401, tries
// one refresh + retry before giving up.
export const apiFetchResponse = async <T>(
  path: string,
  opts: ApiFetchOptions = {}
): Promise<ApiFetchRaw<T>> => {
  // use the tokens the refresh pass gave us, otherwise read them off the request
  const tokens = opts._retryTokens ?? (await getAuthCookieValues())
  const [url, init] = buildRequest(path, opts, tokens)

  const res = await fetch(url, init)
  const setCookies: string[] = res.headers.getSetCookie()

  // not a 401 (or we opted out of refreshing) — nothing clever to do
  if (res.status !== 401 || opts.skipRefresh) {
    return parseEnvelope<T>(res, setCookies)
  }

  // token's probably expired. try to refresh once and replay the request once.
  // skipRefresh on the refresh call is what keeps this from looping forever.
  let newTokens: { accessToken: string; refreshToken: string } | null = null

  try {
    // ask for fresh tokens using whatever we already have
    const refreshResult = await apiFetchResponse<unknown>("/auth/refresh", {
      method: "POST",
      skipRefresh: true,
      _retryTokens: tokens as { accessToken: string; refreshToken: string },
    })

    // try to persist the new cookies — no-ops if we're mid-render, that's fine
    const parsed = parseAuthSetCookies(refreshResult.setCookies)
    await tryRelayAuthCookies(parsed)

    // dig the new values back out so we can replay the request with them
    const at = parsed.find((c) => c.name === ACCESS_TOKEN_COOKIE)?.value
    const rt = parsed.find((c) => c.name === REFRESH_TOKEN_COOKIE)?.value

    if (at) {
      newTokens = {
        accessToken: at,
        refreshToken: rt ?? tokens.refreshToken ?? "",
      }
    }
  } catch {
    // refresh itself blew up — session's gone
    await tryClearAuthCookies()
    throw new ApiError(401, "Session expired. Please log in again.")
  }

  // refresh came back ok but without an access token — treat it the same
  if (!newTokens) {
    await tryClearAuthCookies()
    throw new ApiError(401, "Session expired. Please log in again.")
  }

  // replay the original request with the new tokens (skipRefresh so we don't recurse)
  const [retryUrl, retryInit] = buildRequest(
    path,
    { ...opts, skipRefresh: true },
    newTokens
  )
  const retryRes = await fetch(retryUrl, retryInit)
  const retryCookies: string[] = retryRes.headers.getSetCookie()

  // still 401 even with fresh tokens — give up
  if (retryRes.status === 401) {
    await tryClearAuthCookies()
    throw new ApiError(401, "Session expired. Please log in again.")
  }

  return parseEnvelope<T>(retryRes, retryCookies)
}

// unwrap the { success, status, message, data } envelope the API wraps everything in
const parseEnvelope = async <T>(
  res: Response,
  setCookies: string[]
): Promise<ApiFetchRaw<T>> => {
  let body: ApiEnvelope<T>
  try {
    body = (await res.json()) as ApiEnvelope<T>
  } catch {
    // not JSON, or empty body — nothing we can do with it
    throw new ApiError(
      res.status,
      `Unexpected response from API (status ${res.status})`
    )
  }

  if (!body.success) {
    throw new ApiError(
      body.status ?? res.status,
      body.message || `Request failed (status ${body.status ?? res.status})`
    )
  }

  return { data: body.data, setCookies }
}

// most calls don't care about cookies
export const apiFetch = async <T>(
  path: string,
  opts: ApiFetchOptions = {}
): Promise<T> => {
  const { data } = await apiFetchResponse<T>(path, opts)

  return data
}

// Anonymous fetch for the API's genuinely public endpoints.Never reads cookies and never refreshes —
// which makes it the ONLY fetch path allowed inside a plain "use cache"
export const publicApiFetch = async <T>(
  path: string,
  opts: RequestInit & { json?: unknown } = {}
): Promise<T> => {
  const [url, init] = buildRequest(path, opts, {
    accessToken: null,
    refreshToken: null,
  })

  const res = await fetch(url, init)

  const { data } = await parseEnvelope<T>(res, [])

  return data
}
