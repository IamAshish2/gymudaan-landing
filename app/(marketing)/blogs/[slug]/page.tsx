import type { Metadata } from "next"
import { notFound } from "next/navigation"

import BlogArticlePage from "@/components/blog/BlogArticlePage"
import {
  articleSlugs,
  getArticle,
  isPublishedArticle,
} from "@/lib/blog/articles"
import { ROUTES } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo/metadata"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

// Articles are static content, so every one is prerendered at build time.
// Which URLs are actually served (200 vs 404) is decided in proxy.ts from
// lib/blog/registry.ts, before streaming starts.
export const generateStaticParams = () => articleSlugs.map((slug) => ({ slug }))

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  return pageMetadata({
    path: ROUTES.blogPost(slug),
    title: article.post.title,
    description: article.post.excerpt,
    type: "article",
    // Drafts only render in non-production builds (proxy.ts 404s them in
    // production), and stay out of search results there too.
    noindex: !isPublishedArticle(slug),
    images: article.post.image
      ? [
          {
            url: article.post.image.src.src,
            width: article.post.image.src.width,
            height: article.post.image.src.height,
            alt: article.post.title,
          },
        ]
      : undefined,
  })
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  return <BlogArticlePage article={article} />
}

export default BlogPostPage
