import type { MetadataRoute } from "next"

import { ROUTES } from "@/lib/routes"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: new URL(ROUTES.home, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: 1,
  },
]

export default sitemap
