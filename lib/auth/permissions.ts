import "server-only"

import { redirect } from "next/navigation"

import { getSessionUser } from "@/lib/auth/get-session-user"
import { ROUTES, roleHome } from "@/lib/routes"
import type { SessionUser, UserRole } from "@/lib/auth/types"

// Call at the top of every guarded layout/page/action: no session → login,
// wrong role → own home. redirect() throws NEXT_REDIRECT — never try/catch this.
export const requireRole = async (
  ...roles: UserRole[]
): Promise<SessionUser> => {
  const user = await getSessionUser()

  if (!user) {
    redirect(ROUTES.auth.login)
  }

  if (!roles.includes(user.role)) {
    redirect(roleHome(user.role))
  }

  return user
}

// UX-only check (e.g. can(user, "users:delete")) — ADMIN always passes, others
// check the permissions array. Actions must still call requireRole.
export const can = (user: SessionUser | null, action: string): boolean => {
  if (!user) return false

  if (user.role === "ADMIN") return true

  return user.permissions.includes(action)
}
