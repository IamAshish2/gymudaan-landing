import Image from "next/image"

import ActionLinks from "@/components/landing/primitives/ActionLinks"
import Container from "@/components/landing/primitives/Container"
import Reveal from "@/components/landing/primitives/Reveal"
import Typography from "@/components/ui/Typography"
import { finalCta } from "@/lib/landing/content"
import ctaBg from "@/public/landing/cta/cta-bg.webp"

// Full-bleed band over the orange swoosh artwork (node 1:248).
const FinalCta = () => (
  <section
    id="get-started"
    aria-labelledby="cta-title"
    className="relative isolate overflow-hidden border-y border-line-dark py-band text-white"
  >
    <Image
      src={ctaBg}
      alt=""
      fill
      sizes="100vw"
      className="-z-10 object-cover"
    />
    <Container>
      {/* Title, text and buttons fade up as they reach the screen, like
          the sections above. */}
      <Reveal className="flex flex-col items-center text-center">
        <Typography variant="display" id="cta-title" className="max-w-[20em]">
          {finalCta.title}
        </Typography>
        <Typography
          variant="bodyLg"
          className="mt-4 max-w-[33.4em] font-medium opacity-80"
        >
          {finalCta.description}
        </Typography>
        <ActionLinks actions={finalCta.actions} className="mt-8" />
      </Reveal>
    </Container>
  </section>
)

export default FinalCta
