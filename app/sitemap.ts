import type { MetadataRoute } from "next"

import { articleSlugs } from "@/lib/blog/articles"
import { ROUTES } from "@/lib/routes"
import { absoluteUrl } from "@/lib/seo/site-url"

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: absoluteUrl(ROUTES.home),
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: absoluteUrl(ROUTES.pricing),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: absoluteUrl(ROUTES.blogs),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  ...articleSlugs.map((slug) => ({
    url: absoluteUrl(ROUTES.blogPost(slug)),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })),
  {
    url: absoluteUrl(ROUTES.legal.terms),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: absoluteUrl(ROUTES.legal.privacy),
    changeFrequency: "yearly",
    priority: 0.3,
  },
]

export default sitemap
