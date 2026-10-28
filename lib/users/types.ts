import type { Role } from "@/lib/roles/types"
import type { Audit } from "@/lib/types"

// Platform user account — docs/API.md §Users.
export type AppUser = {
  id: number
  email: string
  role: Role
  activeStatus: boolean
  isNew: boolean
  audit?: Audit
}
