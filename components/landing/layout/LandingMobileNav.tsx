"use client"

import { useState } from "react"
import Link from "next/link"

import LandingLogo from "@/components/landing/layout/LandingLogo"
import LandingButton from "@/components/landing/primitives/LandingButton"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navActions, navLinks } from "@/lib/landing/content"
import { IMenu } from "@/lib/icons"

// Below lg the nav links and auth actions move into a right-hand sheet.
const LandingMobileNav = () => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="ml-auto flex size-10 items-center justify-center rounded-button text-white outline-none hover:bg-surface-card focus-visible:ring-[3px] focus-visible:ring-brand/60 lg:hidden"
        >
          <IMenu className="size-6" aria-hidden />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-80 max-w-[85vw] border-line-dark bg-surface-dark text-white"
      >
        <SheetHeader>
          <SheetTitle>
            <LandingLogo />
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={close}
              className="rounded-button px-3 py-3 text-body-lg font-medium text-white/90 outline-none hover:bg-surface-card hover:text-white focus-visible:ring-[3px] focus-visible:ring-brand/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-line-dark p-4">
          <LandingButton variant="dark" size="sm" asChild>
            <Link href={navActions.login.href} onClick={close}>
              {navActions.login.label}
            </Link>
          </LandingButton>
          <LandingButton variant="brand" size="sm" asChild>
            <Link href={navActions.signUp.href} onClick={close}>
              {navActions.signUp.label}
            </Link>
          </LandingButton>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default LandingMobileNav
