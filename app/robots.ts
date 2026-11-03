import type { MetadataRoute } from "next"

import { ROUTES } from "@/lib/routes"
import { LIVE_APP_DISALLOW } from "@/lib/seo/crawl"
import { absoluteUrl } from "@/lib/seo/site-url"

// /onboarding is deliberately absent: it is `noindex`, and blocking it would
// stop crawlers from seeing that. Nothing under /_next/ is blocked.
const robots = (): MetadataRoute.Robots => ({
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

export default robots
