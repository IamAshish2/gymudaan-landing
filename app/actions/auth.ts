"use server"

import { redirect } from "next/navigation"

import { apiFetch, apiFetchResponse, ApiError } from "@/lib/api-client"
import {
  clearAuthCookies,
  parseAuthSetCookies,
  relayAuthCookies,
} from "@/lib/auth/cookies"
import { requireRole } from "@/lib/auth/permissions"
import { ALL_ROLES, normalizeRole } from "@/lib/auth/roles"
import type { AuthUserPayload, UserRole } from "@/lib/auth/types"
import { roleHome, ROUTES } from "@/lib/routes"
import type { ActionState } from "@/lib/types"
import {
  changePasswordSchema,
  loginSchema,
  type ChangePasswordValues,
  type LoginValues,
} from "@/lib/auth/validations"
import { toFieldErrors } from "@/lib/zod-utils"

// Email + password sign-in. Relays the API's auth cookies as our own, then
// sends the user to their role's home.
export const loginAction = async (
  input: LoginValues
): Promise<ActionState> => {
  const parsed = loginSchema.safeParse(input)

  if (!parsed.success) {
    return { errors: toFieldErrors(parsed.error) }
  }

  let role: UserRole | null = null

  try {
    const { data, setCookies } = await apiFetchResponse<AuthUserPayload>(
      "/auth/login",
      {
        method: "POST",
        json: parsed.data,
        skipRefresh: true,
      }
    )

    role = normalizeRole(data.role.role)

    if (!role) {
      return { message: "This account can't sign in here." }
    }

    await relayAuthCookies(parseAuthSetCookies(setCookies))
  } catch (err) {
    if (err instanceof ApiError && (err.status === 400 || err.status === 401)) {
      return { message: "Incorrect email or password." }
    }

    return { message: "Couldn't sign you in. Please try again." }
  }

  // redirect() throws NEXT_REDIRECT — must be outside try/catch.
  redirect(roleHome(role))
}

// TODO(api): docs/API.md has no Google OAuth endpoint yet (Gaps #1). Wire the
// redirect here once the backend publishes the authorization + callback URLs.
export const googleSignInAction = async (): Promise<ActionState> => {
  return { message: "Google sign-in isn't available yet. Use your email." }
}

// Only invalidates OTHER sessions; the current session stays logged in.
export const changePasswordAction = async (
  input: ChangePasswordValues
): Promise<ActionState> => {
  const parsed = changePasswordSchema.safeParse(input)

  if (!parsed.success) {
    return { errors: toFieldErrors(parsed.error) }
  }

  const user = await requireRole(...ALL_ROLES)

  try {
    await apiFetch("/auth/change-password", {
      method: "POST",
      json: {
        appUserId: user.userId,
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
        confirmPassword: parsed.data.confirmPassword,
      },
    })

    return { message: "Password updated. Your other sessions were signed out." }
  } catch (err) {
    if (err instanceof ApiError && (err.status === 400 || err.status === 401)) {
      return { message: err.message || "Your current password is incorrect." }
    }

    return { message: "Couldn't update your password. Please try again." }
  }
}

export const logoutAction = async (): Promise<void> => {
  // Best-effort: tell the API, but clear our cookies regardless of the outcome.
  try {
    await apiFetchResponse("/auth/logout", {
      method: "POST",
      skipRefresh: true,
    })
  } catch {
    // Ignored — see comment above.
  }

  await clearAuthCookies()

  // redirect() throws NEXT_REDIRECT — must be outside try/catch.
  redirect(ROUTES.home)
}
