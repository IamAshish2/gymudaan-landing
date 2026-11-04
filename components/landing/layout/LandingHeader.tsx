import Link from "next/link"

import LandingLogo, {
  LOGO_HOME_LABEL,
} from "@/components/landing/layout/LandingLogo"
import LandingMobileNav from "@/components/landing/layout/LandingMobileNav"
import LandingNavLinks from "@/components/landing/layout/LandingNavLinks"
import ScrollAwareHeader from "@/components/landing/layout/ScrollAwareHeader"
import Container from "@/components/landing/primitives/Container"
import LandingButton from "@/components/landing/primitives/LandingButton"
import { navActions } from "@/lib/landing/content"
import { ROUTES } from "@/lib/routes"
import { linkTarget } from "@/lib/site"

const LandingHeader = () => (
  <ScrollAwareHeader>
    <Container className="flex items-center gap-6 transition-[padding] duration-300 ease-standard group-data-[scrolled=true]/header:px-3 motion-reduce:transition-none lg:grid lg:grid-cols-[1fr_auto_1fr] lg:group-data-[scrolled=true]/header:px-5">
      <Link
        href={ROUTES.home}
        aria-label={LOGO_HOME_LABEL}
        className="rounded-badge transition-[margin] duration-300 ease-standard outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:transition-none lg:-ml-9 lg:justify-self-start lg:group-data-[scrolled=true]/header:ml-0"
      >
        <LandingLogo colorOnScroll />
      </Link>

      <LandingNavLinks />

      <div className="ml-auto hidden items-center gap-6 lg:flex lg:justify-self-end">
        {/* Plain text, styled like the nav links, so Contact Us stays the
            only button. */}
        <Link
          href={navActions.login.href}
          {...linkTarget(navActions.login.href)}
          className="rounded-badge text-body-lg font-medium text-white transition-colors duration-300 ease-standard outline-none hover:text-brand focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:transition-none"
        >
          {navActions.login.label}
        </Link>
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
