import Link from "next/link"

import LandingButton from "@/components/landing/primitives/LandingButton"
import type { LinkAction } from "@/lib/landing/types"
import { linkTarget } from "@/lib/site"
import { cn } from "@/lib/utils"

type ActionLinksProps = {
  actions: LinkAction[]
  className?: string
}

// Brand + dark CTA pair (hero, final CTA). Stacks full-width on phones.
const ActionLinks = ({ actions, className }: ActionLinksProps) => (
  <div
    className={cn(
      "flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:justify-center",
      className
    )}
  >
    {actions.map((action) => (
      <LandingButton key={action.label} variant={action.variant} asChild>
        <Link href={action.href} {...linkTarget(action.href)}>
          {action.label}
        </Link>
      </LandingButton>
    ))}
  </div>
)

export default ActionLinks
