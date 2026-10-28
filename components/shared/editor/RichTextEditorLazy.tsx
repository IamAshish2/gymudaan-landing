"use client"

import dynamic from "next/dynamic"

export type { RichTextEditorHandle } from "./RichTextEditor"

// load it as a lazy client chunk and skip SSR.
const RichTextEditorLazy = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-52 w-full animate-pulse rounded-xl border border-input bg-muted/40" />
  ),
})

export default RichTextEditorLazy
