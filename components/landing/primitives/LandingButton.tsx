import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Marketing buttons from Figma (24px Poppins Medium, 10px radius, 52px tall
// at 1728). Kept separate from components/ui/button, which serves the app.
const landingButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-button font-medium whitespace-nowrap transition-colors duration-300 ease-standard outline-none select-none focus-visible:ring-[3px] focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        brand: "bg-brand text-white hover:bg-brand/85",
        dark: "bg-surface-card text-white hover:bg-surface-hover",
        light: "bg-white text-ink hover:bg-white/85",
        link: "text-white hover:text-brand",
      },
      size: {
        default: "px-6 py-2 text-title-sm",
        sm: "px-4 py-1.5 text-body-lg",
        inline: "p-0 text-title-sm",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "default",
    },
  }
)

type LandingButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof landingButtonVariants> & {
    asChild?: boolean
  }

const LandingButton = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: LandingButtonProps) => {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="landing-button"
      className={cn(landingButtonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export default LandingButton
