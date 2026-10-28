import type { SlateElementProps } from "platejs/static"

import {
  BaseBoldPlugin,
  BaseH1Plugin,
  BaseH2Plugin,
  BaseH3Plugin,
  BaseItalicPlugin,
} from "@platejs/basic-nodes"
import { BaseLinkPlugin } from "@platejs/link"
import {
  BaseBulletedListPlugin,
  BaseListItemContentPlugin,
  BaseListItemPlugin,
  BaseListPlugin,
  BaseNumberedListPlugin,
} from "@platejs/list-classic"
import { BaseImagePlugin } from "@platejs/media"
import { BaseParagraphPlugin } from "platejs"
import { SlateElement } from "platejs/static"

import {
  H1ElementStatic,
  H2ElementStatic,
  H3ElementStatic,
} from "@/components/ui/heading-node-static"
import { ImageElementStatic } from "@/components/ui/image-node-static"
import { LinkElementStatic } from "@/components/ui/link-node-static"

// Static twin of description-kit.tsx, used only to serialize to HTML. Registry
// ParagraphElementStatic renders a <div> (loses paragraph boundaries) — hand-written here with real semantic tags instead.
const ParagraphElementStatic = (props: SlateElementProps) => (
  <SlateElement as="p" {...props}>
    {props.children}
  </SlateElement>
)

const BulletedListElementStatic = (props: SlateElementProps) => (
  <SlateElement as="ul" {...props}>
    {props.children}
  </SlateElement>
)

const NumberedListElementStatic = (props: SlateElementProps) => (
  <SlateElement as="ol" {...props}>
    {props.children}
  </SlateElement>
)

const ListItemElementStatic = (props: SlateElementProps) => (
  <SlateElement as="li" {...props}>
    {props.children}
  </SlateElement>
)

export const DescriptionBaseKit = [
  BaseParagraphPlugin.withComponent(ParagraphElementStatic),
  BaseH1Plugin.withComponent(H1ElementStatic),
  BaseH2Plugin.withComponent(H2ElementStatic),
  BaseH3Plugin.withComponent(H3ElementStatic),
  BaseBoldPlugin,
  BaseItalicPlugin,
  BaseLinkPlugin.withComponent(LinkElementStatic),
  BaseListPlugin,
  BaseListItemPlugin.withComponent(ListItemElementStatic),
  BaseListItemContentPlugin,
  BaseBulletedListPlugin.withComponent(BulletedListElementStatic),
  BaseNumberedListPlugin.withComponent(NumberedListElementStatic),
  BaseImagePlugin.withComponent(ImageElementStatic),
]
