import Script from "next/script"

import AnalyticsEvents from "@/components/shared/AnalyticsEvents"
import { IS_INDEXABLE } from "@/lib/seo/indexing"

// GA4 for the marketing site, from NEXT_PUBLIC_GA_MEASUREMENT_ID (the live site
// uses G-MRY1JZCLXM; the owner must confirm it is the property to keep, see
// docs/seo/08 §12). Loads only in production builds, after the page is
// interactive. `config` sends the initial page_view; App Router navigations
// are counted by GA4 Enhanced Measurement's "page changes based on browser
// history events" (on by default), so no manual page_view is sent here.
// Adding one as well would count every navigation twice.
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()

if (MEASUREMENT_ID && !/^G-[A-Z0-9]{6,12}$/.test(MEASUREMENT_ID)) {
  throw new Error(
    `NEXT_PUBLIC_GA_MEASUREMENT_ID="${MEASUREMENT_ID}" is not a GA4 measurement ID (G-XXXXXXXX).`
  )
}

const Analytics = () => {
  if (!IS_INDEXABLE || !MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${MEASUREMENT_ID}');`}
      </Script>
      <AnalyticsEvents />
    </>
  )
}

export default Analytics
