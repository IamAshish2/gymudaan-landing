import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/constants"
import {
  isBlogPublic,
  isKnownArticle,
  isPublishedArticle,
} from "@/lib/blog/registry"
import { ROUTES } from "@/lib/routes"
import { IS_INDEXABLE } from "@/lib/seo/indexing"

// Blog articles: 200 vs 404 is decided here, before rendering. Pages stream
// (app/loading.tsx), so a notFound() inside the page can no longer change the
// 200 status, only add noindex. Unknown slugs 404 everywhere. Drafts 404 in
// production and stay previewable (noindex) in staging/preview/development.
// Rewriting to a path no route matches renders app/not-found.tsx with a real 404.
const BLOG_ARTICLE_PATH = /^\/blogs\/([^/]+)$/
const UNMATCHED_PATH = "/__blog-article-not-found"

const blogArticleResponse = (request: NextRequest, encodedSlug: string) => {
  let slug = ""
  try {
    slug = decodeURIComponent(encodedSlug)
  } catch {
    // Malformed percent-encoding: not an article.
  }
  const served =
    isPublishedArticle(slug) || (!IS_INDEXABLE && isKnownArticle(slug))

  return served
    ? NextResponse.next()
    : NextResponse.rewrite(new URL(UNMATCHED_PATH, request.url))
}

// Optimistic cookie-presence check only, NOT a security boundary — real
// enforcement is requireRole() (getSessionUser + /auth/me) in layouts/actions, then the API's JWT check.

export const proxy = (request: NextRequest) => {
  const blogArticle = BLOG_ARTICLE_PATH.exec(request.nextUrl.pathname)
  if (blogArticle) return blogArticleResponse(request, blogArticle[1])

  // The /blogs listing: 404 while the blog is hidden (production builds with
  // no published article), so placeholder posts are never published.
  if (request.nextUrl.pathname === ROUTES.blogs) {
    return isBlogPublic
      ? NextResponse.next()
      : NextResponse.rewrite(new URL(UNMATCHED_PATH, request.url))
  }

  const hasToken = request.cookies.has(ACCESS_TOKEN_COOKIE)
  if (hasToken) return NextResponse.next()

  return NextResponse.redirect(new URL(ROUTES.home, request.url))
}

export const config = {
  // Static literals required as dynamic values are ignored at build time.
  // Keep in sync with ROUTES.dashboard.root, ROUTES.admin.root, ROUTES.account.root.
  // "/blogs" and "/blogs/:slug" are the blog branches above (ROUTES.blogs,
  // ROUTES.blogPost).
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/account/:path*",
    "/blogs",
    "/blogs/:slug",
  ],
}
