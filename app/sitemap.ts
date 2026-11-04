import type { MetadataRoute } from "next"

import {
  hasPublishedArticles,
  publishedArticleSlugs,
} from "@/lib/blog/registry"
import { ROUTES } from "@/lib/routes"
import { IS_INDEXABLE } from "@/lib/seo/indexing"
import { absoluteUrl } from "@/lib/seo/site-url"

// Indexable pages only. /blogs and articles appear once an article is
// published. No lastmod: there are no tracked content dates to report.
// TODO(pre-launch): the pricing URL follows the /plans decision (docs/seo/03 §3).
const productionSitemap = (): MetadataRoute.Sitemap => [
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
  ...(hasPublishedArticles
    ? [
        {
          url: absoluteUrl(ROUTES.blogs),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        },
      ]
    : []),
  ...publishedArticleSlugs.map((slug) => ({
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

// Staging, preview and development builds list nothing.
const sitemap = (): MetadataRoute.Sitemap =>
  IS_INDEXABLE ? productionSitemap() : []

export default sitemap
