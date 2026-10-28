import type { ReactNode } from "react"

import Container from "@/components/landing/primitives/Container"
import type { Tone } from "@/lib/landing/types"
import { cn } from "@/lib/utils"

type SectionProps = {
  id?: string
  /** Pass the heading id for `aria-labelledby`. */
  labelledBy?: string
  /** Sets text colour only; the band behind the section owns the surface. */
  tone?: Tone
  className?: string
  children: ReactNode
}

const Section = ({
  id,
  labelledBy,
  tone = "dark",
  className,
  children,
}: SectionProps) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={cn(
      "relative py-section",
      tone === "dark" ? "text-white" : "text-ink",
      className
    )}
  >
    <Container>{children}</Container>
  </section>
)

export default Section
