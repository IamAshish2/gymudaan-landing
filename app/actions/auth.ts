"use server"

import { redirect } from "next/navigation"

import { apiFetch, apiFetchResponse, ApiError } from "@/lib/api-client"
import { clearAuthCookies } from "@/lib/auth/cookies"
import { requireRole } from "@/lib/auth/permissions"
import { ALL_ROLES } from "@/lib/auth/roles"
import { ROUTES } from "@/lib/routes"
import type { ActionState } from "@/lib/types"
import {
  changePasswordSchema,
  type ChangePasswordValues,
} from "@/lib/auth/validations"
import { toFieldErrors } from "@/lib/zod-utils"

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
