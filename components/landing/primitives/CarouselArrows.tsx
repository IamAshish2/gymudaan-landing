import Image, { type StaticImageData } from "next/image"

import { cn } from "@/lib/utils"
import nextDark from "@/public/landing/services/arrow-next-dark.svg"
import prevDark from "@/public/landing/services/arrow-prev-dark.svg"
import nextInsights from "@/public/landing/insights/arrow-next.svg"
import prevInsights from "@/public/landing/insights/arrow-prev.svg"
import nextLight from "@/public/landing/serve/arrow-next-light.svg"
import prevLight from "@/public/landing/serve/arrow-prev-light.svg"

// The three arrow pairs exported from Figma: large white-on-brown (services),
// orange-on-peach (light band) and small white-on-brown (insights).
const ARROWS: Record<
  CarouselArrowsVariant,
  { prev: StaticImageData; next: StaticImageData; size: string }
> = {
  dark: { prev: prevDark, next: nextDark, size: "w-12 lg:w-16.5" },
  light: { prev: prevLight, next: nextLight, size: "w-10 lg:w-10.5" },
  compact: { prev: prevInsights, next: nextInsights, size: "w-10 lg:w-11.5" },
}

type CarouselArrowsVariant = "dark" | "light" | "compact"

type CarouselArrowsProps = {
  variant: CarouselArrowsVariant
  /** What is being scrolled, e.g. "services" → "Previous services". */
  label: string
  /** Id of the scroller these buttons drive. */
  controls: string
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
  className?: string
}

const CarouselArrows = ({
  variant,
  label,
  controls,
  onPrev,
  onNext,
  canPrev,
  canNext,
  className,
}: CarouselArrowsProps) => {
  const arrows = ARROWS[variant]
  const buttonClass = cn(
    "rounded-full transition-[opacity,transform] duration-300 ease-standard outline-none hover:scale-105 focus-visible:ring-[3px] focus-visible:ring-brand/60 disabled:cursor-default disabled:opacity-40 disabled:hover:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100",
    arrows.size
  )

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <button
        type="button"
        className={buttonClass}
        onClick={onPrev}
        disabled={!canPrev}
        aria-controls={controls}
        aria-label={`Previous ${label}`}
      >
        <Image src={arrows.prev} alt="" className="h-auto w-full" />
      </button>
      <button
        type="button"
        className={buttonClass}
        onClick={onNext}
        disabled={!canNext}
        aria-controls={controls}
        aria-label={`Next ${label}`}
      >
        <Image src={arrows.next} alt="" className="h-auto w-full" />
      </button>
    </div>
  )
}

export default CarouselArrows
