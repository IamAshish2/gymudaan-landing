import {
  isLikelyHtml,
  plainTextToHtml,
  RICH_TEXT_CLASSES,
} from "@/lib/rich-text"
import { sanitizeRichTextHtml } from "@/lib/sanitize-rich-text"
import { cn } from "@/lib/utils"

// Server-component renderer for rich-text description HTML. Re-sanitizes on
// render (defense in depth, the API stores raw strings) — styles must match lib/sanitize-rich-text.ts's allow-list exactly.
type RichTextProps = {
  html: string
  className?: string
}

const RichText = ({ html, className }: RichTextProps) => {
  const safe = sanitizeRichTextHtml(
    isLikelyHtml(html) ? html : plainTextToHtml(html)
  )

  return (
    <div
      className={cn(RICH_TEXT_CLASSES, className)}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  )
}

export default RichText
