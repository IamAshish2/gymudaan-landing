"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { navLinks } from "@/lib/landing/content"
import { ROUTES } from "@/lib/routes"

/**
 * Whether a nav link points at the current page. Section anchors on the home
 * page ("/#testimonials") never count, so Home alone is active there; other
 * links also match their sub-pages (Blogs stays active on an article).
 */
export const isNavLinkActive = (href: string, pathname: string): boolean => {
  if (href.includes("#")) return false
  if (href === ROUTES.home) return pathname === ROUTES.home
  return pathname === href || pathname.startsWith(`${href}/`)
}

// Desktop nav. The orange underline sweeps in on hover and stays, thicker,
// under the current page's link, which also turns orange.
const LandingNavLinks = () => {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          aria-current={
            isNavLinkActive(link.href, pathname) ? "page" : undefined
          }
          className="relative rounded-badge text-body-lg font-medium text-white transition-colors duration-300 ease-standard outline-none after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-500 after:ease-emphasized hover:after:scale-x-100 focus-visible:ring-[3px] focus-visible:ring-brand/60 aria-[current=page]:text-brand aria-[current=page]:after:-bottom-1 aria-[current=page]:after:h-0.5 aria-[current=page]:after:scale-x-100 aria-[current=page]:after:rounded-full motion-reduce:transition-none motion-reduce:after:transition-none"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default LandingNavLinks
