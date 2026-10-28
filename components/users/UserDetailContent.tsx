import RoleBadge from "@/components/roles/RoleBadge"
import UserAvatar from "@/components/users/UserAvatar"
import DetailRow from "@/components/shared/DetailRow"
import { Badge } from "@/components/ui/badge"
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import Typography from "@/components/ui/Typography"
import { IBadgeCheck, IShieldCheck } from "@/lib/icons"
import type { AppUser } from "@/lib/users/types"
import { formatAuditDate } from "@/lib/utils"
import { STATUS_TINT } from "@/lib/status-tint"

type UserDetailContentProps = {
  user: AppUser
}

const UserDetailContent = ({ user }: UserDetailContentProps) => (
  <>
    <SheetHeader className="gap-3 border-b border-border">
      <div className="flex items-start gap-3">
        <UserAvatar email={user.email} className="size-14 text-base" />

        <div className="flex min-w-0 flex-col gap-1 pt-0.5">
          <SheetTitle className="truncate">{user.email}</SheetTitle>

          <div className="flex flex-wrap items-center gap-2">
            <RoleBadge role={user.role} />

            {user.activeStatus ? (
              <Badge variant="outline" className={STATUS_TINT.success}>
                Active
              </Badge>
            ) : (
              <Badge variant="destructive">Inactive</Badge>
            )}
          </div>
        </div>
      </div>

      <SheetDescription>
        {user.activeStatus
          ? "This user can sign in and use the platform."
          : "Deactivated. This user can't sign in until reactivated."}
      </SheetDescription>
    </SheetHeader>

    <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4 md:px-6">
      <DetailRow
        icon={<IShieldCheck className="size-4" />}
        label="Role"
        value={user.role.name || user.role.role}
      />

      <DetailRow
        icon={<IBadgeCheck className="size-4" />}
        label="Onboarding"
        value={user.isNew ? "New user (setup pending)" : "Completed"}
      />

      {user.audit && (
        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <Typography variant="small" className="text-muted-foreground">
            Timeline
          </Typography>

          <ol className="flex flex-col pt-1">
            {[
              {
                label: "Created",
                detail: formatAuditDate(user.audit.createdDate),
              },
              {
                label: "Last updated",
                detail: `${formatAuditDate(user.audit.lastModifiedDate)} · by ${user.audit.updatedBy}`,
              },
            ].map((entry, index, all) => {
              const isLatest = index === all.length - 1

              return (
                <li
                  key={entry.label}
                  className="relative flex gap-3 pb-5 last:pb-0"
                >
                  {!isLatest && (
                    <span
                      aria-hidden
                      className="absolute top-4 bottom-0 left-[3.5px] w-px bg-primary/30"
                    />
                  )}

                  <span
                    aria-hidden
                    className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                  />

                  <div className="flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{entry.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {entry.detail}
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </div>
  </>
)

export default UserDetailContent
