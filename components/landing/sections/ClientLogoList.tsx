import Image from "next/image"

import { clients } from "@/lib/landing/content"
import { cn } from "@/lib/utils"

type LogoRowProps = {
  /** The second copy that closes the loop; hidden from assistive tech. */
  duplicate?: boolean
}

const LogoRow = ({ duplicate = false }: LogoRowProps) => (
  <ul
    aria-hidden={duplicate || undefined}
    className={cn(
      "flex shrink-0 items-center gap-4 pr-4 lg:gap-6 lg:pr-6",
      duplicate && "motion-reduce:hidden"
    )}
  >
    {clients.logos.map((logo) => (
      <li key={logo.name} className="shrink-0">
        <Image
          src={logo.image}
          alt={duplicate ? "" : logo.name}
          sizes="320px"
          className="h-auto max-h-20 w-auto max-w-40 rounded-card lg:max-h-30 lg:max-w-60"
        />
      </li>
    ))}
  </ul>
)

type ClientLogoListProps = {
  className?: string
}

// Fifteen logos don't fit one row, so they loop past edge to edge, shared by
// the home and pricing pages. Two copies of the row make the -50% animation
// seamless. It pauses on hover, and with reduced motion it stays still and
// scrolls by hand instead.
const ClientLogoList = ({ className }: ClientLogoListProps) => (
  <div
    className={cn(
      "group/logos -mx-gutter overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto",
      className
    )}
  >
    <div className="flex w-max animate-marquee group-hover/logos:[animation-play-state:paused] motion-reduce:animate-none">
      <LogoRow />
      <LogoRow duplicate />
    </div>
  </div>
)

export default ClientLogoList
