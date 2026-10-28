import * as React from "react"

import type { TImageElement } from "platejs"
import type { SlateElementProps } from "platejs/static"

import { SlateElement } from "platejs/static"

// Deliberately stays a plain <img>, not next/image: this component isn't
// painted to a browser DOM — platejs/static uses it purely to serialize the
// editor's Slate tree into an HTML string (RichTextEditor's serializeHtml),
// which then gets sanitized down to a bare `<img src alt>` anyway (see
// lib/sanitize-rich-text.ts's img allow-list) before being stored and later
// injected via RichText.tsx's dangerouslySetInnerHTML. A next/image element
// here would never reach a real page — swapping it would only risk breaking
// the serializer for no visible benefit.
export function ImageElementStatic(props: SlateElementProps<TImageElement>) {
  return (
    <SlateElement {...props} as="p" className="py-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={props.element.url} alt="" className="max-w-full rounded-md" />
    </SlateElement>
  )
}
