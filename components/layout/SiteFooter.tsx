import Link from "next/link"

import BrandMark from "@/components/shared/BrandMark"
import { SECTION_MAX, SECTION_X } from "@/components/shared/SectionLayout"
import Typography from "@/components/ui/Typography"
import { SITE_NAV_LINKS } from "@/lib/nav"
import { ROUTES } from "@/lib/routes"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

const SiteFooter = () => (
  <footer className="border-t border-border">
    <div
      className={cn(
        SECTION_X,
        SECTION_MAX,
        "flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between"
      )}
    >
      <div className="flex flex-col gap-2">
        <Link href={ROUTES.home} aria-label="Home" className="w-fit">
          <BrandMark />
        </Link>
        <Typography variant="muted">{SITE.tagline}</Typography>
      </div>

      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
        {SITE_NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  </footer>
)

export default SiteFooter
