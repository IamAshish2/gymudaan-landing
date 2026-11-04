import Link from "next/link"

import LandingLogo from "@/components/landing/layout/LandingLogo"
import { ROUTES } from "@/lib/routes"

// Logo-only header for auth pages, matching the onboarding header.
const AuthHeader = () => (
  <header className="px-onboarding-panel-x pt-6">
    <Link
      href={ROUTES.home}
      aria-label="Gym Udaan home"
      className="inline-flex rounded-chip text-ink outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60"
    >
      <LandingLogo className="text-ink [&_img]:brightness-0 lg:[&_img]:h-9" />
    </Link>
  </header>
)

export default AuthHeader
