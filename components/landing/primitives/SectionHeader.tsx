import type { ReactNode } from "react"

import RichTextLine from "@/components/landing/primitives/RichTextLine"
import SectionBadge from "@/components/landing/primitives/SectionBadge"
import Typography from "@/components/ui/Typography"
import type { SectionIntro, Tone } from "@/lib/landing/types"
import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  intro: SectionIntro
  /** Id of the heading, referenced by the section's `aria-labelledby`. */
  titleId: string
  tone?: Tone
  /** Carousel arrows etc. — sit under the description, bottom-aligned. */
  actions?: ReactNode
  /** Heading measure in em, so line breaks hold as the type scales. */
  titleClassName?: string
  className?: string
}

// Figma pattern used by most sections: badge + heading on the left,
// right-aligned description (and optional arrows) on the right. Without
// actions the description sits on the heading's baseline; with actions the
// description rides the top and the arrows the bottom.
const SectionHeader = ({
  intro,
  titleId,
  tone = "dark",
  actions,
  titleClassName,
  className,
}: SectionHeaderProps) => (
  <div
    className={cn(
      "flex flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-between lg:gap-12",
      className
    )}
  >
    <div className="flex flex-col gap-3">
      {intro.badge ? (
        <SectionBadge tone={tone}>{intro.badge}</SectionBadge>
      ) : null}
      <Typography
        variant="display"
        id={titleId}
        className={cn("max-w-[15em]", titleClassName)}
      >
        <RichTextLine text={intro.title} />
      </Typography>
    </div>

    {intro.description || actions ? (
      <div
        className={cn(
          "flex flex-col gap-6 lg:max-w-168 lg:items-end lg:text-right",
          actions ? "lg:justify-between lg:pt-4" : "lg:justify-end"
        )}
      >
        {intro.description ? (
          <Typography variant="bodyLg" className="text-pretty opacity-80">
            {intro.description}
          </Typography>
        ) : null}
        {actions}
      </div>
    ) : null}
  </div>
)

export default SectionHeader
