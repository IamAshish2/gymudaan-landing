import type { MetadataRoute } from "next"

import { ROUTES } from "@/lib/routes"
import { absoluteUrl } from "@/lib/seo/site-url"

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ROUTES.home,
    disallow: [ROUTES.dashboard.root, ROUTES.admin.root, ROUTES.account.root],
  },
  sitemap: absoluteUrl("/sitemap.xml"),
})

export default robots
