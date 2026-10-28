import type { MetadataRoute } from "next"

import { ROUTES } from "@/lib/routes"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ROUTES.home,
    disallow: [ROUTES.dashboard.root, ROUTES.admin.root, ROUTES.account.root],
  },
  sitemap: new URL("/sitemap.xml", siteUrl).toString(),
})

export default robots
