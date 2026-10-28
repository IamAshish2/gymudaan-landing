import Typography from "@/components/ui/Typography"
import { IZap } from "@/lib/icons"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

type BrandMarkProps = {
  className?: string
}

// Logo + wordmark. Swap the icon for your logo once you have one.
const BrandMark = ({ className }: BrandMarkProps) => (
  <span className={cn("flex items-center gap-2", className)}>
    <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
      <IZap className="size-4" aria-hidden />
    </span>
    <Typography variant="large" as="span">
      {SITE.name}
    </Typography>
  </span>
)

export default BrandMark
