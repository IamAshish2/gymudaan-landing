// Dependency-free helpers shared by client (editor init, Zod checks) and
// server (sanitizer, renderer) — keep sanitize-html out, must stay client-safe.

import { cn } from "@/lib/utils"

// Shared prose styles for rendered rich-text HTML — the server RichText
// component and any client component rendering pre-sanitized HTML directly
// (sanitize-html itself can't cross into a client bundle) both use this.
export const RICH_TEXT_CLASSES = cn(
  "[&_p]:leading-7 [&_p+p]:mt-3",
  "[&_h1]:mt-5 [&_h1]:scroll-m-20 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1:first-child]:mt-0",
  "[&_h2]:mt-4 [&_h2]:scroll-m-20 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2:first-child]:mt-0",
  "[&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3:first-child]:mt-0",
  "[&_ul]:my-2 [&_ul]:ml-6 [&_ul]:list-disc",
  "[&_ol]:my-2 [&_ol]:ml-6 [&_ol]:list-decimal",
  "[&_li]:mt-1",
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
  "[&_img]:my-3 [&_img]:max-w-full [&_img]:rounded-md"
)

export const isLikelyHtml = (value: string): boolean =>
  /<[a-z][\s\S]*>/i.test(value)

const escapeHtml = (text: string): string =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")

export const plainTextToHtml = (text: string): string =>
  text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replaceAll("\n", "<br />")}</p>`)
    .join("")

// Length validation only — NOT a sanitizer.
export const htmlToPlainText = (html: string): string =>
  html
    .replace(/<\/(?:p|li|h[1-6]|ul|ol)>|<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replaceAll("﻿", "")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
