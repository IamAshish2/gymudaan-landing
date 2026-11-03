import Link from "next/link"

import LandingLogo from "@/components/landing/layout/LandingLogo"
import LandingMobileNav from "@/components/landing/layout/LandingMobileNav"
import ScrollAwareHeader from "@/components/landing/layout/ScrollAwareHeader"
import Container from "@/components/landing/primitives/Container"
import LandingButton from "@/components/landing/primitives/LandingButton"
import { navActions, navLinks } from "@/lib/landing/content"
import { ROUTES } from "@/lib/routes"
import { linkTarget, SITE } from "@/lib/site"

const LandingHeader = () => (
  <ScrollAwareHeader>
    <Container className="flex items-center gap-6 transition-[padding] duration-300 ease-standard group-data-[scrolled=true]/header:px-3 motion-reduce:transition-none lg:grid lg:grid-cols-[1fr_auto_1fr] lg:group-data-[scrolled=true]/header:px-5">
      <Link
        href={ROUTES.home}
        aria-label={`${SITE.name} home`}
        className="rounded-badge transition-[margin] duration-300 ease-standard outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:transition-none lg:-ml-9 lg:justify-self-start lg:group-data-[scrolled=true]/header:ml-0"
      >
        <LandingLogo />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="relative rounded-badge text-body-lg font-medium text-white outline-none after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-500 after:ease-emphasized hover:after:scale-x-100 focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:after:transition-none"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto hidden items-center gap-5 lg:flex lg:justify-self-end">
        <LandingButton variant="brand" asChild>
          <Link
            href={navActions.contact.href}
            {...linkTarget(navActions.contact.href)}
          >
            {navActions.contact.label}
          </Link>
        </LandingButton>
      </div>

      <LandingMobileNav />
    </Container>
  </ScrollAwareHeader>
)

export default LandingHeader
