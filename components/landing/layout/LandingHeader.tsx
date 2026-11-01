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
    <Container className="flex items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
      <Link
        href={ROUTES.home}
        aria-label={`${SITE.name} home`}
        className="rounded-badge outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 lg:-ml-9 lg:justify-self-start"
      >
        <LandingLogo />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-badge text-body-lg font-medium text-white transition-colors duration-300 ease-standard outline-none hover:text-brand focus-visible:ring-[3px] focus-visible:ring-brand/60"
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
