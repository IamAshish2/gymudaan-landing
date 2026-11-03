import type { Metadata } from "next"
import { notFound } from "next/navigation"

import BlogArticlePage from "@/components/blog/BlogArticlePage"
import { articleSlugs, getArticle } from "@/lib/blog/articles"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

// Articles are static content, so every one is prerendered at build time.
export const generateStaticParams = () => articleSlugs.map((slug) => ({ slug }))

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  return {
    title: article.post.title,
    description: article.post.excerpt,
    openGraph: {
      type: "article",
      title: article.post.title,
      description: article.post.excerpt,
      images: article.post.image ? [article.post.image.src.src] : undefined,
    },
  }
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  return <BlogArticlePage article={article} />
}

export default BlogPostPage
