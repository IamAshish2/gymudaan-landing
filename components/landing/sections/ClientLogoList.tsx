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
      "flex shrink-0 items-center gap-(--logo-gap) pr-(--logo-gap)",
      duplicate && "motion-reduce:hidden"
    )}
  >
    {clients.logos.map((logo) => (
      <li key={logo.name} className="shrink-0">
        <Image
          src={logo.image}
          alt={duplicate ? "" : logo.name}
          sizes="320px"
          loading="eager"
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
// scrolls by hand instead. The gap is one sixth of the strip minus the average
// rendered logo width, so about six logos show at once wherever they fit.
const ClientLogoList = ({ className }: ClientLogoListProps) => (
  <div
    className={cn(
      "group/logos -mx-gutter overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] [--logo-gap:max(2rem,calc(min(100vw,var(--container-page))/6-var(--logo-width)))] [--logo-width:5.5rem] motion-reduce:overflow-x-auto lg:[--logo-width:8.125rem]",
      className
    )}
  >
    <div className="flex w-max animate-marquee group-hover/logos:paused motion-reduce:animate-none">
      <LogoRow />
      <LogoRow duplicate />
    </div>
  </div>
)

export default ClientLogoList
