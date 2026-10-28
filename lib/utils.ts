import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the custom @theme tokens in globals.css. Without this,
// `text-display` is read as a colour and `cn("text-display", "text-white")`
// silently drops the font size.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "step",
        "stat",
        "title-lg",
        "title",
        "title-sm",
        "card-title",
        "body-lg",
        "quote",
        "body",
        "badge",
        "watermark",
      ],
      radius: ["badge", "photo", "button", "card", "panel", "tile", "band"],
      spacing: ["gutter", "section", "section-content", "hero-top", "band"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API audit timestamps come back as "2026-07-09  00:25:01" (double space) —
// normalize the whitespace so `new Date(...)` parses it reliably.
export const formatAuditDate = (raw: string): string => {
  const date = new Date(raw.trim().replace(/\s+/, "T"))

  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}
