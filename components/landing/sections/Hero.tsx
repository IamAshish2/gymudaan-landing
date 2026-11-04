import type { ReactNode } from "react"
import Image from "next/image"

import ActionLinks from "@/components/landing/primitives/ActionLinks"
import Container from "@/components/landing/primitives/Container"
import ClientLogos from "@/components/landing/sections/ClientLogos"
import HeroVideo from "@/components/landing/sections/HeroVideo"
import Typography from "@/components/ui/Typography"
import { hero } from "@/lib/landing/content"
import heroBg from "@/public/landing/hero/hero-bg.webp"

type HeroProps = {
  /** Sections that continue on the same backdrop below the client logos. */
  children?: ReactNode
}

const TITLE_START_MS = 120
const WORD_STAGGER_MS = 55

const titleWords = hero.title.split(" ")
const shortWordCount = hero.titleShort.split(" ").length
// Phones show only the opening words, so the heading stays a single sentence
// in the HTML (one H1 text for crawlers and screen readers).
if (!hero.title.startsWith(`${hero.titleShort} `)) {
  throw new Error("hero.titleShort must be the opening words of hero.title")
}
const titleEndMs = TITLE_START_MS + titleWords.length * WORD_STAGGER_MS

type RisingWordsProps = {
  words: string[]
  /** Words from this index on are hidden below sm. */
  phoneWordCount: number
}

// Each word rises from behind its own clip, one after another.
const RisingWords = ({ words, phoneWordCount }: RisingWordsProps) => (
  <span>
    {words.map((word, index) => (
      <span
        key={`${word}-${index}`}
        className={index >= phoneWordCount ? "max-sm:hidden" : undefined}
      >
        <span className="inline-block overflow-clip pb-[0.08em] align-top">
          <span
            className="inline-block motion-safe:animate-hero-word"
            style={{
              animationDelay: `${TITLE_START_MS + index * WORD_STAGGER_MS}ms`,
            }}
          >
            {word}
          </span>
        </span>{" "}
      </span>
    ))}
  </span>
)

// The checkered, orange-lit backdrop (node 1:12) sits behind the hero, the
// client logos and whatever follows them, and runs on under the rounded top
// of the services band. The entrance is CSS only, so it plays on first paint
// without waiting for JS; each word rises from behind its own clip.
const Hero = ({ children }: HeroProps) => (
  <div className="relative isolate">
    <div aria-hidden className="absolute inset-x-0 top-0 -bottom-52 -z-10">
      <Image
        src={heroBg}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-surface-dark/30" />
    </div>

    <section aria-labelledby="hero-title" className="pt-hero-top text-white">
      <Container className="flex flex-col items-center text-center">
        <Typography
          variant="body"
          className="font-medium motion-safe:animate-hero-fade"
        >
          {hero.eyebrow}
        </Typography>
        <Typography
          variant="display"
          as="h1"
          id="hero-title"
          className="mt-1 max-w-[23em] text-hero-fg"
        >
          {/* Phones get the opening words (two lines); sm and up the full
              title. It is one sentence either way. */}
          <RisingWords words={titleWords} phoneWordCount={shortWordCount} />
        </Typography>
        <Typography
          variant="bodyLg"
          className="mt-3 max-w-[36em] opacity-80 motion-safe:animate-hero-fade max-sm:text-body"
          style={{ animationDelay: `${titleEndMs + 80}ms` }}
        >
          {hero.description}
        </Typography>

        <div
          className="mt-8 flex w-full justify-center motion-safe:animate-hero-fade"
          style={{ animationDelay: `${titleEndMs + 200}ms` }}
        >
          <ActionLinks actions={hero.actions} />
        </div>

        {/* Entrance on the outer layer, scroll tilt on the inner one. */}
        <div
          className="relative mt-12 w-full perspective-distant motion-safe:animate-hero-dashboard lg:mt-20"
          style={{ animationDelay: `${titleEndMs + 320}ms` }}
        >
          <div
            aria-hidden
            className="absolute inset-x-[8%] -top-[12%] h-1/2 bg-[radial-gradient(closest-side,var(--color-brand-tint),transparent)] blur-2xl"
          />
          <div className="hero-tilt relative overflow-hidden rounded-card border border-line-dark">
            <HeroVideo />
          </div>
        </div>
      </Container>
    </section>

    <ClientLogos />
    {children}
  </div>
)

export default Hero
