import "server-only"

import sanitizeHtml from "sanitize-html"

export const sanitizeRichTextHtml = (html: string): string =>
  sanitizeHtml(html, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "p",
      "ul",
      "ol",
      "li",
      "a",
      "strong",
      "em",
      "b",
      "i",
      "br",
      "img",
    ],
    allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt"] },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    textFilter: (text) => text.replaceAll("﻿", ""),
    transformTags: {
      h4: "h3",
      h5: "h3",
      h6: "h3",
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, rel: "noopener noreferrer" },
      }),
    },
  })
