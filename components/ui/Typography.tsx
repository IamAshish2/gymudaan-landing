import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Page and section typography — hero headlines, marketing copy, nav/footer text.
 *
 * Use ONLY outside shadcn compound components. Inside Card, Popover, Dialog, Select,
 * Table, etc., use that primitive's native slots (CardTitle, Label, SelectTrigger,
 * TableHead, …) — not Typography, raw tags, or custom title/label wrappers.
 * See context/design-system.md → "shadcn compound components".
 */
const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-bold tracking-tight text-balance lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      lead: "text-lg text-muted-foreground sm:text-xl",
      p: "leading-7",
      large: "text-lg font-semibold",
      small: "text-sm leading-none font-medium",
      muted: "text-sm text-muted-foreground",
      blockquote: "border-l-2 pl-6 italic",
      list: "ml-6 list-disc [&>li]:mt-2",
      eyebrow: "text-sm font-medium tracking-widest text-primary uppercase",
      price: "text-2xl font-bold tracking-tight",
      listingPrice: "text-xl font-bold tracking-tight",
      // Marketing landing scale (fluid tokens in globals.css). Colour comes
      // from the section tone, so these set size/weight only.
      display:
        "text-display font-medium [&_em]:text-brand [&_em]:not-italic",
      step: "text-step font-normal",
      stat: "text-stat font-medium",
      titleLg: "text-title-lg font-medium",
      title: "text-title font-medium",
      titleSm: "text-title-sm font-medium",
      cardTitle: "text-card-title font-medium",
      bodyLg: "text-body-lg font-normal",
      body: "text-body font-normal",
      badge: "text-badge font-normal",
    },
  },
  defaultVariants: { variant: "p" },
})

const variantElement = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  p: "p",
  large: "div",
  small: "small",
  muted: "p",
  blockquote: "blockquote",
  list: "ul",
  eyebrow: "p",
  price: "div",
  listingPrice: "div",
  display: "h2",
  step: "span",
  stat: "p",
  titleLg: "h3",
  title: "h3",
  titleSm: "p",
  cardTitle: "h3",
  bodyLg: "p",
  body: "p",
  badge: "span",
} as const

type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    as?: keyof React.JSX.IntrinsicElements
  }

const Typography = ({
  variant = "p",
  as,
  className,
  ...props
}: TypographyProps) => {
  const Comp = (as ?? variantElement[variant ?? "p"]) as React.ElementType
  return (
    <Comp
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  )
}

export default Typography
