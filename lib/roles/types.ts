import type { Audit } from "@/lib/types"

// Backend role entity — docs/API.md §Roles. `role` is the API's role string
// (e.g. ROLE_ADMIN); `system` marks seeded rows that can't be deleted.
export type Role = {
  id: number
  name: string
  role: string
  system: boolean
  access?: string | null
  actionAccess?: string | null
  audit?: Audit
}

// Friendly labels for known role strings; unrecognized values fall back to name/role.
export const ROLE_STRING_LABEL: Record<string, string> = {
  ROLE_SUPER_ADMIN: "Super admin",
  ROLE_ADMIN: "Admin",
  ROLE_USER: "User",
  ROLE_CUSTOMER: "Customer",
  ROLE_SELLER: "Seller",
}
