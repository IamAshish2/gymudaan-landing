"use server"

import { redirect } from "next/navigation"

import { apiFetch, apiFetchResponse, ApiError } from "@/lib/api-client"
import {
  relayAuthCookies,
  clearAuthCookies,
  parseAuthSetCookies,
} from "@/lib/auth/cookies"
import { requireRole } from "@/lib/auth/permissions"
import { ALL_ROLES, normalizeRole } from "@/lib/auth/roles"
import { ROUTES, roleHome, sanitizeNextPath } from "@/lib/routes"
import type { ActionState } from "@/lib/types"
import type { AuthUserPayload } from "@/lib/auth/types"
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
  type ChangePasswordValues,
  type LoginValues,
  type RegisterValues,
} from "@/lib/auth/validations"
import { toFieldErrors } from "@/lib/zod-utils"

export const loginAction = async (
  input: LoginValues,
  next?: string | null
): Promise<ActionState> => {
  // 1. Validate the form
  const parsed = loginSchema.safeParse(input)

  if (!parsed.success) {
    return { errors: toFieldErrors(parsed.error) }
  }

  let redirectTo: string | undefined

  try {
    // 2. API Call via our wrapper around fetch.
    const { data: payload, setCookies } =
      await apiFetchResponse<AuthUserPayload>("/auth/login", {
        method: "POST",
        json: { email: parsed.data.email, password: parsed.data.password },
        skipRefresh: true,
      })

    // 3. An account whose role the app doesn't know can't use any surface.
    const role = normalizeRole(payload.role.role)

    if (!role) {
      return { message: "This account doesn't have access to this app." }
    }

    // 4. Parse out the auth cookies and re-set them as our first-party cookies.
    const parsedCookies = parseAuthSetCookies(setCookies)
    await relayAuthCookies(parsedCookies)

    // 5. Land on ?next= if it's a safe same-site path, otherwise the role's home.
    redirectTo = sanitizeNextPath(next) ?? roleHome(role)
  } catch (err) {
    // 6. Wrong credentials get a friendly message; anything else is generic.
    if (err instanceof ApiError && (err.status === 401 || err.status === 400)) {
      return { message: "Invalid email or password." }
    }

    return { message: "Something went wrong. Please try again." }
  }

  // 7. redirect() throws NEXT_REDIRECT — must be outside try/catch.
  redirect(redirectTo)
}

// The backend contract has no registration endpoint yet (docs/API.md → Gaps).
// Swap the stub body for the real API call once it exists.
export const registerAction = async (
  input: RegisterValues
): Promise<ActionState> => {
  const parsed = registerSchema.safeParse(input)

  if (!parsed.success) {
    return { errors: toFieldErrors(parsed.error) }
  }

  return {
    message: "Registration opens soon! We'll let you know when it's available.",
  }
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
