import type { UserRole } from "@/lib/auth/types"

export const ALL_ROLES: UserRole[] = ["USER", "ADMIN"]

// API role strings (`role.role` on the auth payload) → app roles. Add your
// backend's role values here; anything unmapped is treated as "no session".
const API_ROLE_MAP: Record<string, UserRole> = {
  ROLE_ADMIN: "ADMIN",
  ROLE_SUPER_ADMIN: "ADMIN",
  ROLE_USER: "USER",
  ROLE_CUSTOMER: "USER",
  ROLE_SELLER: "USER",
}

export const normalizeRole = (rawRole: string): UserRole | null => {
  const role = API_ROLE_MAP[rawRole]

  if (!role && process.env.NODE_ENV !== "production") {
    console.warn(
      `[auth] Unknown role string "${rawRole}". Map it in lib/auth/roles.ts.`
    )
  }

  return role ?? null
}
