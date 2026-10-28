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
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  )
}

export default MarketingLayout
