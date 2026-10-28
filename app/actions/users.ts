"use server"

import { updateTag } from "next/cache"

import { apiFetch, ApiError } from "@/lib/api-client"
import { requireRole } from "@/lib/auth/permissions"
import { CACHE_TAGS } from "@/lib/cache-tags"
import type { ActionState } from "@/lib/types"
import type { AppUser } from "@/lib/users/types"
import {
  userCreateSchema,
  userUpdateSchema,
  type UserFormValues,
} from "@/lib/users/validations"
import { toFieldErrors } from "@/lib/zod-utils"

// saveUserAction — /appUser/save creates (no id) and updates (with id). On edit a
// blank password is omitted so the current one is kept.
export const saveUserAction = async (
  input: UserFormValues,
  id?: number
): Promise<ActionState> => {
  const schema = id ? userUpdateSchema : userCreateSchema
  const parsed = schema.safeParse(input)

  if (!parsed.success) {
    return { errors: toFieldErrors(parsed.error) }
  }

  await requireRole("ADMIN")

  const { email, roleId, password } = parsed.data
  const payload = {
    ...(id ? { id } : {}),
    email,
    roleId,
    ...(password ? { password } : {}),
  }

  try {
    const user = await apiFetch<AppUser>("/appUser/save", {
      method: "POST",
      json: payload,
    })

    updateTag(CACHE_TAGS.users)

    return {
      message: id ? "User updated." : "User created.",
      id: user.id,
    }
  } catch (err) {
    if (err instanceof ApiError) {
      return { message: err.message }
    }

    return { message: "Couldn't save this user. Please try again." }
  }
}

export const toggleUserStatusAction = async (
  user: AppUser
): Promise<ActionState> => {
  await requireRole("ADMIN")

  try {
    await apiFetch(`/appUser/activate-status/${user.id}`, { method: "PUT" })

    updateTag(CACHE_TAGS.users)

    return {
      message: user.activeStatus ? "User deactivated." : "User activated.",
    }
  } catch (err) {
    if (err instanceof ApiError) {
      return { message: err.message }
    }

    return { message: "Couldn't update this user. Please try again." }
  }
}

export const deleteUserAction = async (id: number): Promise<ActionState> => {
  await requireRole("ADMIN")

  try {
    await apiFetch(`/appUser/delete/${id}`, { method: "DELETE" })

    updateTag(CACHE_TAGS.users)

    return { message: "User deleted." }
  } catch (err) {
    if (err instanceof ApiError) {
      return { message: err.message }
    }

    return { message: "Couldn't delete this user. Please try again." }
  }
}

export const clearUserNewFlagAction = async (
  id: number
): Promise<ActionState> => {
  await requireRole("ADMIN")

  try {
    await apiFetch(`/appUser/change-new-flag/${id}`, { method: "PATCH" })

    updateTag(CACHE_TAGS.users)

    return { message: "Onboarding flag cleared." }
  } catch (err) {
    if (err instanceof ApiError) {
      return { message: err.message }
    }

    return { message: "Couldn't update this user. Please try again." }
  }
}
