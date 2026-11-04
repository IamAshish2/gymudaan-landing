import type { MetadataRoute } from "next"

import { ROUTES } from "@/lib/routes"
import { LIVE_APP_DISALLOW } from "@/lib/seo/crawl"
import { IS_INDEXABLE } from "@/lib/seo/indexing"
import { absoluteUrl } from "@/lib/seo/site-url"

// Staging, preview and development: crawling stays allowed so crawlers can see
// the X-Robots-Tag / meta `noindex` (a Disallow would hide it), and no sitemap
// is advertised. Access is restricted by hosting-side protection instead.
const nonProductionRobots: MetadataRoute.Robots = {
  rules: { userAgent: "*", allow: ROUTES.home },
}

// /onboarding is deliberately absent: it is `noindex`, and blocking it would
// stop crawlers from seeing that. Nothing under /_next/ is blocked.
const productionRobots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ROUTES.home,
    disallow: [
      ROUTES.dashboard.root,
      ROUTES.admin.root,
      ROUTES.account.root,
      ...LIVE_APP_DISALLOW,
    ],
  },
  sitemap: absoluteUrl("/sitemap.xml"),
})

const robots = (): MetadataRoute.Robots =>
  IS_INDEXABLE ? productionRobots() : nonProductionRobots

export default robots
