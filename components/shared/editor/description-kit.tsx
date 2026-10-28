"use client"

import { HeadingRules } from "@platejs/basic-nodes"
import {
  BoldPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  ItalicPlugin,
} from "@platejs/basic-nodes/react"
import { LinkRules } from "@platejs/link"
import { LinkPlugin } from "@platejs/link/react"
import { BulletedListRules, OrderedListRules } from "@platejs/list-classic"
import {
  BulletedListPlugin,
  ListItemContentPlugin,
  ListItemPlugin,
  ListPlugin,
  NumberedListPlugin,
} from "@platejs/list-classic/react"
import { ImagePlugin } from "@platejs/media/react"
import { createPlatePlugin, ParagraphPlugin } from "platejs/react"

import { H1Element, H2Element, H3Element } from "@/components/ui/heading-node"
import { ImageElement } from "@/components/ui/image-node"
import { LinkElement } from "@/components/ui/link-node"
import { LinkFloatingToolbar } from "@/components/ui/link-toolbar"
import {
  BulletedListElement,
  ListItemElement,
  NumberedListElement,
} from "@/components/ui/list-classic-node"
import { ParagraphElement } from "@/components/ui/paragraph-node"
import { isLikelyHtml } from "@/lib/rich-text"

// Pasted HTML source code (file, ChatGPT) only carries text/plain, so run it
// through the HTML deserializer when the plain text looks like markup — plain text mentioning tags gets parsed too, an acceptable trade-off here.
const HtmlSourcePastePlugin = createPlatePlugin({
  key: "htmlSourcePaste",
}).overrideEditor(({ editor, tf: { insertData } }) => ({
  transforms: {
    insertData: (data) => {
      const html = data.getData("text/html")
      const text = data.getData("text/plain")

      if (!html && text && isLikelyHtml(text)) {
        editor.tf.insertFragment(editor.api.html.deserialize({ element: text }))
        return
      }

      insertData(data)
    },
  },
}))

// v1 plugin set. Must stay in sync with lib/sanitize-rich-text.ts's allow-list,
// description-base-kit.tsx, and RichText.tsx's styles — update all four together for a new node type.
export const DescriptionKit = [
  HtmlSourcePastePlugin,
  ParagraphPlugin.withComponent(ParagraphElement),
  H1Plugin.configure({
    inputRules: [HeadingRules.markdown()],
    node: { component: H1Element },
    rules: { break: { empty: "reset" } },
    shortcuts: { toggle: { keys: "mod+alt+1" } },
  }),
  H2Plugin.configure({
    inputRules: [HeadingRules.markdown()],
    node: { component: H2Element },
    rules: { break: { empty: "reset" } },
    shortcuts: { toggle: { keys: "mod+alt+2" } },
  }),
  H3Plugin.configure({
    inputRules: [HeadingRules.markdown()],
    node: { component: H3Element },
    rules: { break: { empty: "reset" } },
    shortcuts: { toggle: { keys: "mod+alt+3" } },
  }),
  BoldPlugin,
  ItalicPlugin,
  LinkPlugin.configure({
    inputRules: [
      LinkRules.markdown(),
      LinkRules.autolink({ variant: "paste" }),
      LinkRules.autolink({ variant: "space" }),
      LinkRules.autolink({ variant: "break" }),
    ],
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
  ListPlugin.configure({
    inputRules: [
      BulletedListRules.markdown({ variant: "-" }),
      BulletedListRules.markdown({ variant: "*" }),
      OrderedListRules.markdown({ variant: "." }),
      OrderedListRules.markdown({ variant: ")" }),
    ],
  }),
  ListItemPlugin.withComponent(ListItemElement),
  ListItemContentPlugin,
  BulletedListPlugin.configure({
    node: { component: BulletedListElement },
    shortcuts: { toggle: { keys: "mod+alt+5" } },
  }),
  NumberedListPlugin.configure({
    node: { component: NumberedListElement },
    shortcuts: { toggle: { keys: "mod+alt+6" } },
  }),
  // disableUploadInsert: drop/paste goes through our toolbar upload button
  // (uploadImageAction), not Plate's own path — that inserts a blob: URL that vanishes once the sanitizer strips it on save.
  ImagePlugin.configure({
    options: { disableUploadInsert: true },
    node: { component: ImageElement },
  }),
]
