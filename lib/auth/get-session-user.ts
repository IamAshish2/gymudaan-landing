import "server-only"

import { cache } from "react"

import { apiFetch } from "@/lib/api-client"
import { getAuthCookieValues } from "@/lib/auth/cookies"
import { normalizeRole } from "@/lib/auth/roles"
import type { AuthUserPayload, SessionUser } from "@/lib/auth/types"

// React.cache-wrapped: /auth/me is called at most once per request. Never call
// inside "use cache" functions (reads cookies); returns null on any failure.
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const { accessToken } = await getAuthCookieValues()

  if (!accessToken) return null

  try {
    const payload = await apiFetch<AuthUserPayload>("/auth/me")

    const role = normalizeRole(payload.role.role)

    if (!role) return null

    return {
      userId: payload.appUserId,
      email: payload.email,
      role,
      permissions: [],
      isNew: payload.isNew,
    }
  } catch {
    // Network error, 401, bad shape — any failure here just means no session.
    return null
  }
})
