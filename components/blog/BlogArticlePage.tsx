import Image from "next/image"
import Link from "next/link"

import ArticleBody from "@/components/blog/ArticleBody"
import { BlogGridCard } from "@/components/blog/BlogCards"
import Container from "@/components/landing/primitives/Container"
import LandingButton from "@/components/landing/primitives/LandingButton"
import PageIntro from "@/components/landing/primitives/PageIntro"
import ThreadsGreeting from "@/components/landing/primitives/ThreadsGreeting"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import FinalCta from "@/components/landing/sections/FinalCta"
import LegalToc from "@/components/legal/LegalToc"
import Typography from "@/components/ui/Typography"
import {
  articleText,
  getRelatedPosts,
  readingMinutes,
  relatedIntro,
} from "@/lib/blog/articles"
import type { BlogArticle } from "@/lib/blog/types"
import { IArrowLeft } from "@/lib/icons"
import { ROUTES } from "@/lib/routes"

type BlogArticlePageProps = {
  article: BlogArticle
}

// Blog detail: the shared page intro with the byline under it, a wide cover,
// then the legal pages' reading layout (sticky contents beside the text),
// related posts as blog-grid cards, and the closing CTA band.
const BlogArticlePage = ({ article }: BlogArticlePageProps) => {
  const { post, sections } = article
  const related = getRelatedPosts(article)
  const meta = [
    post.author,
    post.date,
    articleText.readTime(readingMinutes(article)),
  ]

  return (
    <>
      <PageIntro
        backdrop={<ThreadsGreeting />}
        badge={post.category}
        title={post.title}
        description={post.excerpt}
        titleClassName="max-w-[20em] text-balance"
        descriptionClassName="max-w-[36em] text-pretty"
      >
        <Typography
          variant="body"
          className="mt-5 flex flex-wrap items-center justify-center gap-x-3 opacity-60"
        >
          {meta.map((item, index) => (
            <span key={item} className="flex items-center gap-x-3">
              {index > 0 ? <span aria-hidden="true">|</span> : null}
              {item}
            </span>
          ))}
        </Typography>
      </PageIntro>

      {post.image ? (
        <Container className="relative mt-section-content">
          <div className="relative aspect-4/3 overflow-hidden rounded-panel border border-line-dark sm:aspect-1528/640">
            <Image
              src={post.image.src}
              alt=""
              fill
              preload
              sizes="(min-width: 1728px) 1528px, 92vw"
              className="object-cover"
            />
          </div>
        </Container>
      ) : null}

      <article className="relative pt-section-content pb-section text-white lg:pt-21">
        <Container className="grid gap-10 lg:grid-cols-[30.3%_minmax(0,1034px)]">
          <LegalToc
            entries={sections.map((section, index) => ({
              label: `${String(index + 1).padStart(2, "0")} ${section.label}`,
              sectionId: section.id,
            }))}
          />

          <div className="min-w-0">
            <ArticleBody sections={sections} />

            <div className="mt-section-content border-t border-line-dark pt-8">
              <LandingButton variant="link" size="inline" asChild>
                <Link href={ROUTES.blogs}>
                  <IArrowLeft aria-hidden="true" className="size-[1em]" />
                  {articleText.backLabel}
                </Link>
              </LandingButton>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-title"
          className="border-t border-line-dark py-section text-white"
        >
          <Container>
            <SectionHeader intro={relatedIntro} titleId="related-title" />
            <ul className="mt-section-content grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <li key={relatedPost.id}>
                  <BlogGridCard post={relatedPost} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <FinalCta />
    </>
  )
}

export default BlogArticlePage
