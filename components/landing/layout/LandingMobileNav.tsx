"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import LandingLogo from "@/components/landing/layout/LandingLogo"
import { isNavLinkActive } from "@/components/landing/layout/LandingNavLinks"
import LandingButton from "@/components/landing/primitives/LandingButton"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navActions, navLinks } from "@/lib/landing/content"
import { IMenu, IX } from "@/lib/icons"
import { ROUTES } from "@/lib/routes"
import { linkTarget, SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

const iconButtonClass =
  "flex size-10 items-center justify-center rounded-button text-white outline-none hover:bg-surface-card focus-visible:ring-[3px] focus-visible:ring-brand/60"

// The current page's row turns orange with a short bar at its left edge.
const rowClass =
  "relative flex items-center px-gutter py-4 text-body-lg font-medium text-white/90 outline-none transition-colors duration-300 ease-standard hover:bg-surface-raised hover:text-white focus-visible:bg-surface-raised focus-visible:text-white motion-reduce:transition-none aria-[current=page]:text-brand aria-[current=page]:before:absolute aria-[current=page]:before:inset-y-3 aria-[current=page]:before:left-0 aria-[current=page]:before:w-1 aria-[current=page]:before:rounded-r-full aria-[current=page]:before:bg-brand"

// Below lg the nav opens as a full-screen panel dropping from the top: logo
// and close button where the header was, one row per link, and the same two
// actions as the desktop header (Contact Us, Login) pinned to the bottom.
const LandingMobileNav = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn(iconButtonClass, "ml-auto lg:hidden")}
        >
          <IMenu className="size-6" aria-hidden />
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        showCloseButton={false}
        className="gap-0 border-0 bg-surface-dark text-white shadow-none data-[side=top]:h-svh data-[side=top]:border-b-0 lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-line-dark px-gutter py-4">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
          <Link
            href={ROUTES.home}
            onClick={close}
            aria-label={`${SITE.name} home`}
            className="rounded-badge outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60"
          >
            <LandingLogo />
          </Link>
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Close menu"
              className={iconButtonClass}
            >
              <IX className="size-6" aria-hidden />
            </button>
          </SheetClose>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
          <ul>
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-line-dark">
                <Link
                  href={link.href}
                  onClick={close}
                  {...linkTarget(link.href)}
                  aria-current={
                    isNavLinkActive(link.href, pathname) ? "page" : undefined
                  }
                  className={rowClass}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 border-t border-line-dark px-gutter pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <LandingButton variant="brand" size="sm" asChild className="h-11">
            <Link
              href={navActions.contact.href}
              onClick={close}
              {...linkTarget(navActions.contact.href)}
            >
              {navActions.contact.label}
            </Link>
          </LandingButton>
          <LandingButton
            variant="dark"
            size="sm"
            asChild
            className="h-11 border border-line-strong"
          >
            <Link
              href={navActions.login.href}
              onClick={close}
              {...linkTarget(navActions.login.href)}
            >
              {navActions.login.label}
            </Link>
          </LandingButton>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default LandingMobileNav
