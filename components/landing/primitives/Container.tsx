import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type ContainerProps = {
  children: ReactNode
  className?: string
}

// 1528px content column inside the 1728px Figma frame; the gutter scales
// from 16px on phones to 100px at 1728.
const Container = ({ children, className }: ContainerProps) => (
  <div className={cn("mx-auto w-full max-w-page px-gutter", className)}>
    {children}
  </div>
)

export default Container
