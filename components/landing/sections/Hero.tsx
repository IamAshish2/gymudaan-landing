import Image from "next/image"

import ActionLinks from "@/components/landing/primitives/ActionLinks"
import Container from "@/components/landing/primitives/Container"
import ClientLogos from "@/components/landing/sections/ClientLogos"
import Typography from "@/components/ui/Typography"
import { hero } from "@/lib/landing/content"
import heroBg from "@/public/landing/hero/hero-bg.webp"
import heroDashboard from "@/public/landing/hero/dashboard.webp"

// Hero + client logos share the checkered, orange-lit backdrop (node 1:7),
// which runs on under the rounded top of the services band.
const Hero = () => (
  <div className="relative isolate pb-22 lg:pb-34">
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <Image src={heroBg} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-surface-dark/30" />
    </div>

    <section aria-labelledby="hero-title" className="pt-hero-top text-white">
      <Container className="flex flex-col items-center text-center">
        <Typography variant="body" className="font-medium">
          {hero.eyebrow}
        </Typography>
        <Typography
          variant="display"
          as="h1"
          id="hero-title"
          className="mt-1 max-w-[23em] text-hero-fg"
        >
          {hero.title}
        </Typography>
        <Typography variant="bodyLg" className="mt-3 max-w-[36em] opacity-80">
          {hero.description}
        </Typography>

        <ActionLinks actions={hero.actions} className="mt-8" />

        <div className="mt-12 w-full overflow-hidden rounded-card border border-line-dark lg:mt-20">
          <Image
            src={heroDashboard}
            alt={hero.imageAlt}
            sizes="(min-width: 1728px) 1528px, 92vw"
            preload
            className="h-auto w-full"
          />
        </div>
      </Container>
    </section>

    <ClientLogos />
  </div>
)

export default Hero
