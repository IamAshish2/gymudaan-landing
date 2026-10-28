"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"

import BrandMark from "@/components/shared/BrandMark"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IMenu } from "@/lib/icons"
import { SITE_NAV_LINKS } from "@/lib/nav"

type SiteMobileNavProps = {
  userSection: ReactNode
}

// Below md the nav links + user section move into a right-hand sheet.
const SiteMobileNav = ({ userSection }: SiteMobileNavProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          aria-label="Open menu"
        >
          <IMenu />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>
            <BrandMark />
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
          {SITE_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-2 py-2.5 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-border p-4">{userSection}</div>
      </SheetContent>
    </Sheet>
  )
}

export default SiteMobileNav
