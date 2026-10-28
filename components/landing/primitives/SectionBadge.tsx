import type { Tone } from "@/lib/landing/types"
import Typography from "@/components/ui/Typography"
import { cn } from "@/lib/utils"

type SectionBadgeProps = {
  children: string
  tone?: Tone
  className?: string
}

const SectionBadge = ({
  children,
  tone = "dark",
  className,
}: SectionBadgeProps) => (
  <Typography
    variant="badge"
    className={cn(
      "inline-flex w-fit items-center rounded-badge px-3.5 py-1.5",
      tone === "dark" ? "bg-badge-dark" : "bg-badge-light",
      className
    )}
  >
    {children}
  </Typography>
)

export default SectionBadge
