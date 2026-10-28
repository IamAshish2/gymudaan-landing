import type { Value } from "platejs"

import { createSlateEditor } from "platejs"
import { serializeHtml } from "platejs/static"

import { DescriptionBaseKit } from "./description-base-kit"

// Serializes the editor value to HTML for the RHF field, "" for empty (so a
// blank editor behaves like an empty textarea for validation/dirty state).
// Output still has Plate wrappers — sanitize it with sanitizeRichTextHtml in
// the server action before it reaches the API.
export const descriptionValueToHtml = async (value: Value): Promise<string> => {
  const editor = createSlateEditor({ plugins: DescriptionBaseKit, value })

  if (!editor.api.string([]).trim()) return ""

  return await serializeHtml(editor, {
    stripClassNames: true,
    stripDataAttributes: true,
  })
}
