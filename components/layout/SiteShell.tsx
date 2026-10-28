import type { ReactNode } from "react"
import { Suspense } from "react"

import NavbarUserSection from "@/components/layout/NavbarUserSection"
import SiteFooter from "@/components/layout/SiteFooter"
import SiteNavbar from "@/components/layout/SiteNavbar"
import { Skeleton } from "@/components/ui/skeleton"

type SiteShellProps = {
  children: ReactNode
}

// Composes the static navbar/footer shell with the dynamic user section
// (async server component, streamed via Suspense) — the PPR slot pattern.
const SiteShell = ({ children }: SiteShellProps) => (
  <div className="flex min-h-svh flex-col">
    <SiteNavbar
      userSection={
        <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
          <NavbarUserSection />
        </Suspense>
      }
    />
    <main className="flex-1">{children}</main>
    <SiteFooter />
  </div>
)

export default SiteShell
