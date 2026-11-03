import type { Metadata } from "next"

import { SITE } from "@/lib/site"

type PageMetadataInput = {
  /** The page's own path, always taken from ROUTES. Becomes its canonical. */
  path: string
  /** Page title; the root layout's "%s | Gym Udaan" template is applied. */
  title: string
  description: string
  /** Use the title as is, without the template suffix (the homepage). */
  absoluteTitle?: boolean
  type?: "website" | "article"
  /** Share images. Omitted, the site-wide default share images are used. */
  images?: ShareImage[]
}

type ShareImage = {
  url: string
  width?: number
  height?: number
  alt?: string
}

// The root app/opengraph-image.jpg and app/twitter-image.jpg (1200×630).
// Next.js stops applying those file-based images to any page that sets its own
// `openGraph`/`twitter`, so pages reference them explicitly here. The alt text
// matches app/opengraph-image.alt.txt and app/twitter-image.alt.txt.
const defaultShareImage = (url: string) => ({
  url,
  type: "image/jpeg",
  width: 1200,
  height: 630,
  alt: `${SITE.name}: ${SITE.tagline}`,
})

// Per-page metadata in one place. Next.js merges `openGraph` and `twitter`
// shallowly, so a page that sets any field there loses the root layout's
// values. This builds both in full from the same inputs as the title, so a
// page's share preview always matches the page. The canonical is the page's
// own path, resolved against metadataBase (lib/seo/site-url.ts); it is never
// set in a layout, where it would point every page at the homepage.
export const pageMetadata = ({
  path,
  title,
  description,
  absoluteTitle = false,
  type = "website",
  images,
}: PageMetadataInput): Metadata => {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE.name,
      locale: "en_US",
      title: fullTitle,
      description,
      images: images ?? [defaultShareImage("/opengraph-image.jpg")],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images ?? [defaultShareImage("/twitter-image.jpg")],
    },
  }
}
