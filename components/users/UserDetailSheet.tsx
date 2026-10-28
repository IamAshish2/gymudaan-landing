"use client"

import UserDetailContent from "@/components/users/UserDetailContent"
import UserRowActions from "@/components/users/UserRowActions"
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet"
import type { Role } from "@/lib/roles/types"
import type { AppUser } from "@/lib/users/types"

type UserDetailSheetProps = {
  user: AppUser | null
  roles: Role[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

const UserDetailSheet = ({
  user,
  roles,
  open,
  onOpenChange,
}: UserDetailSheetProps) => {
  if (!user) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-lg">
        <UserDetailContent user={user} />

        <SheetFooter className="border-t border-border">
          <UserRowActions
            user={user}
            roles={roles}
            variant="inline"
            onActionComplete={() => onOpenChange(false)}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default UserDetailSheet
