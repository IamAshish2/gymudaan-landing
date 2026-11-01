import type { MetadataRoute } from "next"

import { ROUTES } from "@/lib/routes"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: new URL(ROUTES.home, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: new URL(ROUTES.pricing, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: new URL(ROUTES.blogs, siteUrl).toString(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: new URL(ROUTES.legal.terms, siteUrl).toString(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: new URL(ROUTES.legal.privacy, siteUrl).toString(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
]

export default sitemap
