import { Badge } from "@/components/ui/badge"
import { ROLE_BADGE_STYLES } from "@/lib/roles/status"
import { ROLE_STRING_LABEL, type Role } from "@/lib/roles/types"

type RoleBadgeProps = {
  role: Pick<Role, "name" | "role">
}

// The one signature element of the Users & Roles surface — a role-aware badge
// shared by both tables and the user detail sheet. Known roles get a friendly
// label + stable tint; custom roles show their name over a neutral secondary.
const RoleBadge = ({ role }: RoleBadgeProps) => {
  const known = ROLE_BADGE_STYLES[role.role]
  const label = ROLE_STRING_LABEL[role.role] ?? role.name ?? role.role

  if (known) {
    return (
      <Badge variant="outline" className={known} title={role.role}>
        {label}
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" title={role.role}>
      {label}
    </Badge>
  )
}

export default RoleBadge
