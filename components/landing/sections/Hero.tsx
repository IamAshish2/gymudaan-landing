import type { ReactNode } from "react"
import Image from "next/image"

import ActionLinks from "@/components/landing/primitives/ActionLinks"
import Container from "@/components/landing/primitives/Container"
import ClientLogos from "@/components/landing/sections/ClientLogos"
import Typography from "@/components/ui/Typography"
import { hero } from "@/lib/landing/content"
import heroBg from "@/public/landing/hero/hero-bg.webp"
import heroDashboard from "@/public/landing/hero/dashboard.webp"

type HeroProps = {
  /** Sections that continue on the same backdrop below the client logos. */
  children?: ReactNode
}

const TITLE_START_MS = 120
const WORD_STAGGER_MS = 55

const titleWords = hero.title.split(" ")
const titleEndMs = TITLE_START_MS + titleWords.length * WORD_STAGGER_MS

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
          {titleWords.map((word, index) => (
            <span key={`${word}-${index}`}>
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
        </Typography>
        <Typography
          variant="bodyLg"
          className="mt-3 max-w-[36em] opacity-80 motion-safe:animate-hero-fade"
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
            <Image
              src={heroDashboard}
              alt={hero.imageAlt}
              sizes="(min-width: 1728px) 1528px, 92vw"
              preload
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>

    <ClientLogos />
    {children}
  </div>
)

export default Hero
