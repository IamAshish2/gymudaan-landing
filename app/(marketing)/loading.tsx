import BarbellLoader from "@/components/landing/primitives/BarbellLoader"

// Shown inside the marketing header and footer while a marketing page
// streams in, e.g. when opening a blog post or the plans page.
const MarketingLoading = () => (
  <div className="flex min-h-[70svh] items-center justify-center pt-header-sm lg:pt-header">
    <BarbellLoader />
  </div>
)

export default MarketingLoading
