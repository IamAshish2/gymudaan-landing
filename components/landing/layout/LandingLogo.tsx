import Image from "next/image"

import Typography from "@/components/ui/Typography"
import { cn } from "@/lib/utils"
import emblem from "@/public/landing/brand/logo-emblem.png"

type LandingLogoProps = {
  className?: string
}

// Dove emblem + "GymUdaan" wordmark from the Figma navbar (node 1:31).
const LandingLogo = ({ className }: LandingLogoProps) => (
  <span className={cn("flex items-center gap-2.5 text-white", className)}>
    <Image src={emblem} alt="" className="h-7 w-auto lg:h-13" sizes="80px" />
    <Typography as="span" variant="titleSm" className="font-semibold">
      GymUdaan
    </Typography>
  </span>
)

export default LandingLogo
