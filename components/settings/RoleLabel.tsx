import { Badge } from "@/components/ui/badge"
import type { UserRole } from "@/lib/auth/types"
import { STATUS_TINT } from "@/lib/status-tint"

const ROLE_LABEL: Record<UserRole, string> = {
  USER: "User",
  ADMIN: "Admin",
}

// App-level role (SessionUser.role). For the API's role entity use RoleBadge.
const RoleLabel = ({ role }: { role: UserRole }) => (
  <Badge
    variant="outline"
    className={role === "ADMIN" ? STATUS_TINT.brand : STATUS_TINT.neutral}
  >
    {ROLE_LABEL[role]}
  </Badge>
)

export default RoleLabel
