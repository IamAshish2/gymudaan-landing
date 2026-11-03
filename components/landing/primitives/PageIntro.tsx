import type { ReactNode } from "react"

import Container from "@/components/landing/primitives/Container"
import SectionBadge from "@/components/landing/primitives/SectionBadge"
import Typography from "@/components/ui/Typography"
import { cn } from "@/lib/utils"

type PageIntroProps = {
  badge: string
  title: string
  description: string
  /** Heading measure in em, so line breaks hold as the type scales. */
  titleClassName?: string
  descriptionClassName?: string
  /** Controls under the description, e.g. the billing switch. */
  children?: ReactNode
  /** Decoration drawn behind the intro, e.g. <ThreadsGreeting />. */
  backdrop?: ReactNode
}

// Centred badge, h1 and description that open every page besides the home
// page, starting clear of the fixed header. They rise in one after another on
// first paint with the hero's CSS-only fade, so nothing waits for JS.
const ENTRANCE_STAGGER_MS = 90

const entrance = (step: number) => ({
  animationDelay: `${step * ENTRANCE_STAGGER_MS}ms`,
})

const PageIntro = ({
  badge,
  title,
  description,
  titleClassName,
  descriptionClassName,
  children,
  backdrop,
}: PageIntroProps) => (
  <div className={cn("pt-page-top text-white", backdrop && "relative isolate")}>
    {backdrop}
    <Container className="flex flex-col items-center text-center">
      <SectionBadge className="motion-safe:animate-hero-fade">
        {badge}
      </SectionBadge>
      <Typography
        variant="display"
        as="h1"
        className={cn(
          "mt-2 text-hero-fg motion-safe:animate-hero-fade",
          titleClassName
        )}
        style={entrance(1)}
      >
        {title}
      </Typography>
      <Typography
        variant="bodyLg"
        className={cn(
          "mt-4 opacity-80 motion-safe:animate-hero-fade",
          descriptionClassName
        )}
        style={entrance(2)}
      >
        {description}
      </Typography>
      {children ? (
        <div
          className="flex w-full flex-col items-center motion-safe:animate-hero-fade"
          style={entrance(3)}
        >
          {children}
        </div>
      ) : null}
    </Container>
  </div>
)

export default PageIntro
