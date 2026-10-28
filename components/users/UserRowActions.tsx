"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  clearUserNewFlagAction,
  deleteUserAction,
  toggleUserStatusAction,
} from "@/app/actions/users"
import ConfirmDialog from "@/components/shared/ConfirmDialog"
import UserDialog from "@/components/users/UserDialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  IBadgeCheck,
  ICircleAlert,
  IMoreHorizontal,
  IPencil,
  ISparkles,
  ITrash2,
} from "@/lib/icons"
import type { Role } from "@/lib/roles/types"
import type { AppUser } from "@/lib/users/types"
import { cn } from "@/lib/utils"

type DialogKind = "edit" | "toggle" | "delete" | null

type UserRowActionsProps = {
  user: AppUser
  roles: Role[]
  variant?: "menu" | "inline"
  onActionComplete?: () => void
}

const UserRowActions = ({
  user,
  roles,
  variant = "menu",
  onActionComplete,
}: UserRowActionsProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [openDialog, setOpenDialog] = useState<DialogKind>(null)

  const runAction = (action: () => Promise<{ message?: string }>) => {
    startTransition(async () => {
      const result = await action()
      if (result?.message) toast.success(result.message)
      setOpenDialog(null)
      router.refresh()
      onActionComplete?.()
    })
  }

  const justify = variant === "menu" ? "justify-end" : "justify-start"

  return (
    <div className={cn("flex", justify)}>
      {variant === "menu" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <span className="sr-only">Open actions for {user.email}</span>
              <IMoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setOpenDialog("edit")}>
              <IPencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenDialog("toggle")}>
              {user.activeStatus ? (
                <>
                  <ICircleAlert />
                  Deactivate
                </>
              ) : (
                <>
                  <IBadgeCheck />
                  Activate
                </>
              )}
            </DropdownMenuItem>
            {user.isNew && (
              <DropdownMenuItem
                onSelect={() =>
                  runAction(() => clearUserNewFlagAction(user.id))
                }
              >
                <ISparkles />
                Clear onboarding flag
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setOpenDialog("delete")}
            >
              <ITrash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpenDialog("edit")}
          >
            <IPencil />
            Edit
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpenDialog("toggle")}
          >
            {user.activeStatus ? (
              <>
                <ICircleAlert />
                Deactivate
              </>
            ) : (
              <>
                <IBadgeCheck />
                Activate
              </>
            )}
          </Button>

          {user.isNew && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => runAction(() => clearUserNewFlagAction(user.id))}
              disabled={isPending}
            >
              <ISparkles />
              Clear onboarding flag
            </Button>
          )}

          <Button
            size="sm"
            variant="destructive"
            onClick={() => setOpenDialog("delete")}
          >
            <ITrash2 />
            Delete
          </Button>
        </div>
      )}

      <UserDialog
        open={openDialog === "edit"}
        onOpenChange={(open) => setOpenDialog(open ? "edit" : null)}
        roles={roles}
        user={user}
      />

      <ConfirmDialog
        open={openDialog === "toggle"}
        onOpenChange={(open) => setOpenDialog(open ? "toggle" : null)}
        title={
          user.activeStatus
            ? `Deactivate ${user.email}?`
            : `Activate ${user.email}?`
        }
        description={
          user.activeStatus
            ? "This user won't be able to sign in until reactivated."
            : "This user will be able to sign in again immediately."
        }
        confirmLabel={user.activeStatus ? "Deactivate" : "Activate"}
        pendingLabel={user.activeStatus ? "Deactivating…" : "Activating…"}
        destructive={user.activeStatus}
        isPending={isPending}
        onConfirm={() => runAction(() => toggleUserStatusAction(user))}
      />

      <ConfirmDialog
        open={openDialog === "delete"}
        onOpenChange={(open) => setOpenDialog(open ? "delete" : null)}
        title={`Delete ${user.email}?`}
        description="This permanently removes the account and its credentials. This can't be undone."
        confirmLabel="Delete"
        pendingLabel="Deleting…"
        destructive
        isPending={isPending}
        onConfirm={() => runAction(() => deleteUserAction(user.id))}
      />
    </div>
  )
}

export default UserRowActions
