import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// Page spacing SSOT (8px-base editorial scale) — use these constants instead of
// ad-hoc padding/gap utilities on public and account pages.

/** Section band — 48px mobile, 64px desktop */
export const SECTION_PY = "py-12 lg:py-16"
export const SECTION_GAP_TOP = "pt-12 lg:pt-16"
export const SECTION_GAP_BOTTOM = "pb-12 lg:pb-16"

export const SECTION_X = "px-6"
export const SECTION_MAX = "mx-auto max-w-[1300px]"

export const SECTION_CONTENT_MT = "mt-8 lg:mt-10"
export const SECTION_GRID_GAP = "gap-6"
export const SECTION_STACK_GAP = "gap-6"
export const ELEMENT_GAP = "gap-2"
export const INTERACTIVE_TRANSITION = "transition-all duration-300 ease-in-out"
export const CARD_PADDING = "p-6"
export const NAV_HEIGHT = "h-16"
export const HERO_PT = "pt-12 lg:pt-16"
export const HERO_STACK_GAP = "gap-6"
export const TITLE_CLUSTER_GAP = "gap-2"

type SectionShellProps = {
  id?: string
  children: ReactNode
  className?: string
  withBottomPadding?: boolean
  firstSection?: boolean
  /** Pass the section heading `id` for `aria-labelledby`. */
  labelledBy?: string
}

const SectionShell = ({
  id,
  children,
  className,
  withBottomPadding = false,
  firstSection = false,
  labelledBy,
}: SectionShellProps) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={cn(
      SECTION_PY,
      firstSection && HERO_PT,
      withBottomPadding && SECTION_GAP_BOTTOM,
      className
    )}
  >
    <div className={cn(SECTION_X, SECTION_MAX)}>{children}</div>
  </section>
)

export default SectionShell
