export type ApiRole = {
  id: number
  name: string
  role: string
  system: boolean
}

/** Shape returned by POST /auth/login and GET /auth/me */
export type AuthUserPayload = {
  appUserId: number
  email: string
  role: ApiRole
  isNew: boolean
}

/** App-level roles. API role strings map onto these in lib/auth/roles.ts. */
export type UserRole = "USER" | "ADMIN"

/** Session identity passed from layouts as props — never fetched client-side, use getSessionUser() server-side. */
export type SessionUser = {
  userId: number
  email: string
  role: UserRole
  /** Permission strings for fine-grained checks — wire up when the API exposes them. */
  permissions: string[]
  isNew: boolean
}
