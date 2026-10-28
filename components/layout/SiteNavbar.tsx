import type { ReactNode } from "react"
import Link from "next/link"

import SiteMobileNav from "@/components/layout/SiteMobileNav"
import BrandMark from "@/components/shared/BrandMark"
import {
  INTERACTIVE_TRANSITION,
  NAV_HEIGHT,
  SECTION_MAX,
  SECTION_X,
} from "@/components/shared/SectionLayout"
import ThemeToggle from "@/components/shared/ThemeToggle"
import { SITE_NAV_LINKS } from "@/lib/nav"
import { ROUTES } from "@/lib/routes"
import { cn } from "@/lib/utils"

type SiteNavbarProps = {
  /** Session-dependent slot (sign-in links or the user menu), streamed in. */
  userSection: ReactNode
}

const SiteNavbar = ({ userSection }: SiteNavbarProps) => (
  <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
    <div
      className={cn(
        SECTION_X,
        SECTION_MAX,
        NAV_HEIGHT,
        "flex items-center gap-6"
      )}
    >
      <Link href={ROUTES.home} aria-label="Home">
        <BrandMark />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
        {SITE_NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              INTERACTIVE_TRANSITION,
              "text-sm font-medium text-muted-foreground hover:text-foreground"
            )}
          >
            {link.title}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <div className="hidden md:block">{userSection}</div>
        <SiteMobileNav userSection={userSection} />
      </div>
    </div>
  </header>
)

export default SiteNavbar
