// Which blog articles exist and which are published: the single source of truth
// for proxy.ts (200 vs 404), the sitemap, article metadata and rendering.
// Publishing an article means flipping its `published` flag here, nothing else.
// Deliberately free of images and article content so proxy.ts can import it.
// lib/blog/articles.ts fails the build if its articles and this list disagree.

import { IS_INDEXABLE } from "@/lib/seo/indexing"

type ArticleEntry = {
  slug: string
  /** Final, approved copy. Drafts are noindex, out of the sitemap, and 404 in production. */
  published: boolean
}

const BLOG_ARTICLES: readonly ArticleEntry[] = [
  // Placeholder copy (see the TODO in lib/blog/articles.ts).
  { slug: "manage-gym-efficiently", published: false },
  // Nepal guides (lib/blog/guides.ts): drafts awaiting review, a real author
  // and date, and a fact check against the official sources they name.
  { slug: "how-to-open-a-gym-in-nepal", published: false },
  { slug: "choose-gym-management-software-nepal", published: false },
  { slug: "gym-software-price-nepal", published: false },
]

/** Every article with a page, drafts included (prerendered at build). */
export const articleSlugs = BLOG_ARTICLES.map((article) => article.slug)

/** Published articles: the only ones in the sitemap or served in production. */
export const publishedArticleSlugs = BLOG_ARTICLES.filter(
  (article) => article.published
).map((article) => article.slug)

/** True once a real article is live, so /blogs can be indexed. */
export const hasPublishedArticles = publishedArticleSlugs.length > 0

/**
 * Whether the blog is shown at all: the /blogs listing, its nav and footer
 * links and the homepage Insights cards. Production builds hide it (and
 * proxy.ts 404s /blogs) until a real article is published; non-production
 * builds always show it for review.
 */
export const isBlogPublic = hasPublishedArticles || !IS_INDEXABLE

export const isKnownArticle = (slug: string) => articleSlugs.includes(slug)

export const isPublishedArticle = (slug: string) =>
  publishedArticleSlugs.includes(slug)
