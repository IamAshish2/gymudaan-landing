import "server-only"

import { cookies } from "next/headers"

import {
  ACCESS_TOKEN_COOKIE,
  AUTH_COOKIE_NAMES,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/auth/constants"

type ParsedCookie = {
  name: string
  value: string
  maxAge: number | undefined
}

// Pull our two auth cookies out of the API's Set-Cookie headers.
// We don't keep the API's Strict/Secure flags — we set our own later.
export const parseAuthSetCookies = (setCookies: string[]): ParsedCookie[] => {
  return setCookies
    .map((header) => {
      // header is like "name=value; Max-Age=123; Path=/; ..."
      const parts = header.split(";").map((p) => p.trim())
      const [nameValue, ...attrs] = parts
      const eqIdx = nameValue.indexOf("=")
      if (eqIdx === -1) return null
      const name = nameValue.slice(0, eqIdx).trim()
      const value = nameValue.slice(eqIdx + 1).trim()

      // skip anything that isn't one of our auth cookies
      if (
        !AUTH_COOKIE_NAMES.includes(name as (typeof AUTH_COOKIE_NAMES)[number])
      )
        return null

      // grab Max-Age if it's there so our cookie expires when theirs does
      let maxAge: number | undefined
      for (const attr of attrs) {
        const lower = attr.toLowerCase()
        if (lower.startsWith("max-age=")) {
          const parsed = parseInt(attr.split("=")[1], 10)
          if (!isNaN(parsed)) maxAge = parsed
        }
      }

      return { name, value, maxAge }
    })
    .filter((c): c is ParsedCookie => c !== null)
}

// lax, not strict — otherwise the cookies don't ride along on normal navigations
const cookieOptions = (maxAge?: number) => {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(maxAge !== undefined ? { maxAge } : {}),
  }
}

// write the tokens back out as our own cookies.
// only works in a server action / route handler — throws during a plain render.
export const relayAuthCookies = async (
  parsed: ParsedCookie[]
): Promise<void> => {
  const jar = await cookies()

  for (const { name, value, maxAge } of parsed) {
    jar.set(name, value, cookieOptions(maxAge))
  }
}

// nuke both cookies (logout, or when a refresh gives up).
// same deal — action/route handler only.
export const clearAuthCookies = async (): Promise<void> => {
  const jar = await cookies()

  for (const name of AUTH_COOKIE_NAMES) {
    jar.delete(name)
  }
}

// same as relayAuthCookies but safe to call mid-render — if the write isn't
// allowed we just ignore it and let the next request's action persist them.
export const tryRelayAuthCookies = async (
  parsed: ParsedCookie[]
): Promise<void> => {
  try {
    await relayAuthCookies(parsed)
  } catch {
    // can't set cookies while rendering — no-op, next action handles it
  }
}

// clearAuthCookies, but won't blow up mid-render
export const tryClearAuthCookies = async (): Promise<void> => {
  try {
    await clearAuthCookies()
  } catch {
    // can't clear while rendering — cookie just expires on its own
  }
}

// read both tokens off the request — null if they're not there
export const getAuthCookieValues = async (): Promise<{
  accessToken: string | null
  refreshToken: string | null
}> => {
  const jar = await cookies()

  return {
    accessToken: jar.get(ACCESS_TOKEN_COOKIE)?.value ?? null,
    refreshToken: jar.get(REFRESH_TOKEN_COOKIE)?.value ?? null,
  }
}
