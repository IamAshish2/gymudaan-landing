import type { StaticImageData } from "next/image"

export type BlogPost = {
  id: string
  title: string
  category: string
  author: string
  date: string
  /** Set only for posts that have an article page. */
  href?: string
  image?: {
    src: StaticImageData
    /** Crop from Figma, as classes on the image. Defaults to object-cover. */
    cropClassName?: string
  }
}

export type ArticleBlock =
  | { kind: "text"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "quote"; text: string }
  | { kind: "callout"; title: string; text: string }

export type ArticleSection = {
  id: string
  /** Short label for the contents list; the heading can run longer. */
  label: string
  title: string
  blocks: ArticleBlock[]
}

export type BlogArticle = {
  /**
   * Final, approved copy. Unpublished articles stay out of the sitemap and are
   * `noindex`; /blogs is `noindex` until at least one article is published.
   */
  published: boolean
  post: BlogPost & { excerpt: string }
  sections: ArticleSection[]
  /** Ids of the posts offered after the article. */
  related: string[]
}
