import LandingFooter from "@/components/landing/layout/LandingFooter"
import LandingHeader from "@/components/landing/layout/LandingHeader"

// Marketing shell: fixed palette (dark bands + one light band) independent of
// the app theme, with its own header and footer.
const MarketingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex min-h-svh flex-col bg-surface-dark text-white">
      {/* Reveals wait on JS, so show everything if it never runs. */}
      <noscript>
        <style>{`.reveal-group > *, .reveal-stagger > * { opacity: 1 !important; translate: none !important; }`}</style>
      </noscript>
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  )
}

export default MarketingLayout
