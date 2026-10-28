"use client"

import { useState, useTransition } from "react"

import Link from "next/link"

import { logoutAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ILayoutDashboard,
  ILogOut,
  IShieldCheck,
  ISlidersHorizontal,
  IUserRound,
} from "@/lib/icons"
import { ROUTES, roleHome } from "@/lib/routes"
import type { SessionUser } from "@/lib/auth/types"
import { cn } from "@/lib/utils"

type NavbarUserMenuProps = {
  user: SessionUser
}

const NavbarUserMenu = ({ user }: NavbarUserMenuProps) => {
  const [isPending, startTransition] = useTransition()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const initial = user.email.charAt(0).toUpperCase()

  const handleConfirmLogout = () => {
    startTransition(async () => {
      await logoutAction()
      setLogoutDialogOpen(false)
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "flex size-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-primary-foreground ring-offset-background transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isPending && "opacity-60"
          )}
          aria-label={`Account menu for ${user.email}`}
        >
          {initial}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuLabel className="font-normal">
            <p className="text-xs text-muted-foreground">Signed in as</p>
            <p className="truncate text-sm font-medium">{user.email}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={roleHome(user.role)}>
              <ILayoutDashboard />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={ROUTES.account.root}>
              <IUserRound />
              Account
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={ROUTES.account.security}>
              <IShieldCheck />
              Security
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={ROUTES.account.preferences}>
              <ISlidersHorizontal />
              Preferences
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onSelect={(event) => {
              event.preventDefault()
              setLogoutDialogOpen(true)
            }}
            disabled={isPending}
          >
            <ILogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent showCloseButton={!isPending}>
          <DialogHeader>
            <DialogTitle>Sign out?</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You&apos;ll need to sign in
              again to access your account.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmLogout}
              disabled={isPending}
            >
              {isPending ? "Signing out…" : "Sign out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NavbarUserMenu
