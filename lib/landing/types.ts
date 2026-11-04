import type { StaticImageData } from "next/image"

import type { Approval } from "@/lib/content-approval"
import type { LucideIcon } from "@/lib/icons"

/**
 * Heading copy with highlighted runs. Plain strings render as-is; `{ em }`
 * renders in the brand colour and `{ muted }` at reduced opacity, matching the
 * orange key words used in every Figma heading.
 */
export type RichSegment = string | { em: string } | { muted: string }
export type RichText = RichSegment[]

export type LinkAction = {
  label: string
  href: string
  variant: "brand" | "dark"
  /** Hidden below lg, where one clear action reads better. */
  desktopOnly?: boolean
}

export type SectionIntro = {
  /** Small pill above the heading, e.g. "Our Services". */
  badge?: string
  title: RichText
  description?: string
}

export type ClientLogo = {
  name: string
  image: StaticImageData
}

export type Service = {
  title: string
  description: string
  cta: { label: string; href: string }
  /** Panel visual. The Figma panels are empty placeholders for now. */
  image?: { src: StaticImageData; alt: string }
  /** Feature demo for the panel; takes the place of `image`. */
  video?: {
    sources: readonly { src: string; type: string }[]
    poster: StaticImageData
    label: string
  }
}

export type Feature = {
  title: string
  description: string
  image: StaticImageData
  imageAlt: string
  /** Crops the image to fill its slot, for art with spare margin to lose. */
  imageCrop?: boolean
}

export type ComparisonStatus = "yes" | "partial" | "no"

export type ComparisonRow = {
  label: string
  icon: StaticImageData
  manual: ComparisonStatus
  generic: ComparisonStatus
  udaan: ComparisonStatus
}

export type LocalHighlight = {
  title: string
  description: string
  icon: LucideIcon
}

export type ServedCity = {
  name: string
}

export type DeviceTier = {
  title: string
  caption: string
  icon: StaticImageData
}

export type Audience = {
  title: string
  description: string
  image: StaticImageData
}

export type ControlTab = {
  id: string
  label: string
  icon: StaticImageData
  image: { src: StaticImageData; alt: string }
}

export type Stat = {
  value: string
  label: string
}

export type Step = {
  title: string
  description: string
}

// Every testimonial needs an explicit sign-off (lib/content-approval.ts).
export type TestimonialTile = Approval &
  (
    | {
        kind: "quote"
        quote: string
        name: string
        role: string
        /** Without a photo the card shows the name's initials. */
        avatar?: StaticImageData
      }
    | { kind: "photo"; image: StaticImageData; alt: string }
    | { kind: "video"; src: string; poster: StaticImageData; label: string }
  )

export type Insight = {
  title: string
  excerpt: string
  href: string
  image: StaticImageData
}

export type Faq = {
  question: string
  answer: string
}

export type FooterColumn = {
  title: string
  links: { label: string; href: string }[]
}

/** Dark bands are black with white text; the light band is white with ink. */
export type Tone = "dark" | "light"
