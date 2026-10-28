import Link from "next/link"

import LandingLogo from "@/components/landing/layout/LandingLogo"
import LandingMobileNav from "@/components/landing/layout/LandingMobileNav"
import ScrollAwareHeader from "@/components/landing/layout/ScrollAwareHeader"
import Container from "@/components/landing/primitives/Container"
import LandingButton from "@/components/landing/primitives/LandingButton"
import { navActions, navLinks } from "@/lib/landing/content"
import { ROUTES } from "@/lib/routes"
import { SITE } from "@/lib/site"

const LandingHeader = () => (
  <ScrollAwareHeader>
    <Container className="flex items-center gap-6">
      <Link
        href={ROUTES.home}
        aria-label={`${SITE.name} home`}
        className="rounded-badge outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60"
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

      <div className="ml-auto hidden items-center gap-5 lg:flex">
        <Link
          href={navActions.login.href}
          className="rounded-badge text-title-sm font-medium text-nav-muted transition-colors duration-300 ease-standard outline-none hover:text-white focus-visible:ring-[3px] focus-visible:ring-brand/60"
        >
          {navActions.login.label}
        </Link>
        <LandingButton variant="brand" asChild>
          <Link href={navActions.signUp.href}>{navActions.signUp.label}</Link>
        </LandingButton>
      </div>

      <LandingMobileNav />
    </Container>
  </ScrollAwareHeader>
)

export default LandingHeader
