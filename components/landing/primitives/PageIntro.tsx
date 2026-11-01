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
}

// Centred badge, h1 and description that open every page besides the home
// page, starting clear of the fixed header.
const PageIntro = ({
  badge,
  title,
  description,
  titleClassName,
  descriptionClassName,
  children,
}: PageIntroProps) => (
  <div className="pt-page-top text-white">
    <Container className="flex flex-col items-center text-center">
      <SectionBadge>{badge}</SectionBadge>
      <Typography
        variant="display"
        as="h1"
        className={cn("mt-2 text-hero-fg", titleClassName)}
      >
        {title}
      </Typography>
      <Typography
        variant="bodyLg"
        className={cn("mt-4 opacity-80", descriptionClassName)}
      >
        {description}
      </Typography>
      {children}
    </Container>
  </div>
)

export default PageIntro
