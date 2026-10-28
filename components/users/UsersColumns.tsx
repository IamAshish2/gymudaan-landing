import type { ColumnDef } from "@tanstack/react-table"

import RoleBadge from "@/components/roles/RoleBadge"
import UserAvatar from "@/components/users/UserAvatar"
import UserRowActions from "@/components/users/UserRowActions"
import { Badge } from "@/components/ui/badge"
import type { Role } from "@/lib/roles/types"
import type { AppUser } from "@/lib/users/types"
import { formatAuditDate } from "@/lib/utils"
import { STATUS_TINT } from "@/lib/status-tint"

// The actions cell needs the roles list for the edit dialog's picker.
export const getUsersColumns = (roles: Role[]): ColumnDef<AppUser>[] => [
  {
    accessorKey: "email",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <UserAvatar email={row.original.email} />
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{row.original.email}</span>
          {row.original.isNew && (
            <Badge variant="secondary" className="shrink-0">
              New
            </Badge>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <RoleBadge role={row.original.role} />,
  },
  {
    accessorKey: "activeStatus",
    header: "Status",
    cell: ({ row }) =>
      row.original.activeStatus ? (
        <Badge variant="outline" className={STATUS_TINT.success}>
          Active
        </Badge>
      ) : (
        <Badge variant="secondary">Inactive</Badge>
      ),
  },
  {
    id: "created",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-muted-foreground tabular-nums">
        {row.original.audit
          ? formatAuditDate(row.original.audit.createdDate)
          : "—"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Action",
    // Row click opens the detail sheet — stop it from bubbling out of the
    // actions cell so opening the dropdown/dialogs doesn't also open it.
    cell: ({ row }) => (
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <UserRowActions user={row.original} roles={roles} />
      </div>
    ),
  },
]
