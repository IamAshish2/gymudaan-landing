"use server"

import { getSessionUser } from "@/lib/auth/get-session-user"
import { sanitizeRichTextHtml } from "@/lib/sanitize-rich-text"
import type { ActionState } from "@/lib/types"

// Sanitizes editor HTML with the same allow-list RichText uses on render, so
// client components can preview what will actually be shown.
export const previewRichTextAction = async (
  html: string
): Promise<ActionState & { html?: string }> => {
  const user = await getSessionUser()

  if (!user) {
    return { message: "You need to be logged in to preview content." }
  }

  return { html: sanitizeRichTextHtml(html) }
}
