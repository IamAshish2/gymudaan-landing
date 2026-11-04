import Image from "next/image"

import Typography from "@/components/ui/Typography"
import { cn } from "@/lib/utils"
import emblemColored from "@/public/landing/brand/logo-emblem-colored.webp"
import emblem from "@/public/landing/brand/logo-emblem.webp"

type LandingLogoProps = {
  className?: string
  /**
   * Cross-fade to the orange emblem once the page scrolls. Only for use inside
   * ScrollAwareHeader, which sets the `group/header` scrolled flag.
   */
  colorOnScroll?: boolean
}

const emblemClass = "h-7 w-auto lg:h-13"
const fadeClass =
  "transition-opacity duration-300 ease-standard motion-reduce:transition-none"

/** The wordmark as drawn in the Figma logo (one word, unlike SITE.name). */
export const LOGO_WORDMARK = "GymUdaan"

/**
 * Accessible name for a link wrapping the logo. It contains the visible
 * wordmark, so voice-control users can say what they see (WCAG 2.5.3).
 */
export const LOGO_HOME_LABEL = `${LOGO_WORDMARK} home`

// Dove emblem + "GymUdaan" wordmark from the Figma navbar (node 1:31). Both
// emblems share one canvas size and padding, so the swap never shifts layout.
const LandingLogo = ({
  className,
  colorOnScroll = false,
}: LandingLogoProps) => (
  <span className={cn("flex items-center gap-2.5 text-white", className)}>
    {colorOnScroll ? (
      <span className="relative">
        <Image
          src={emblem}
          alt=""
          sizes="80px"
          className={cn(
            emblemClass,
            fadeClass,
            "group-data-[scrolled=true]/header:opacity-0"
          )}
        />
        <Image
          src={emblemColored}
          alt=""
          sizes="80px"
          className={cn(
            emblemClass,
            fadeClass,
            "absolute inset-0 opacity-0 group-data-[scrolled=true]/header:opacity-100"
          )}
        />
      </span>
    ) : (
      <Image src={emblem} alt="" className={emblemClass} sizes="80px" />
    )}
    <Typography as="span" variant="titleSm" className="font-semibold">
      {LOGO_WORDMARK}
    </Typography>
  </span>
)

export default LandingLogo
