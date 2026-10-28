import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * 4-column grid on mobile, 12-column from `lg` upward.
 * Children control their own span with `col-span-*` classes.
 */
const GridContainer = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => (
  <div className={cn("grid grid-cols-4 gap-6 lg:grid-cols-12", className)}>
    {children}
  </div>
)

export default GridContainer
