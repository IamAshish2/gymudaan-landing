/** A run inside a paragraph. Plain strings render as-is. */
export type LegalInline =
  string | { link: string; href: string } | { alert: string }

export type LegalBlock =
  | { kind: "heading"; text: string }
  | { kind: "text"; text: string | LegalInline[]; medium?: boolean }
  | { kind: "list"; items: string[]; medium?: boolean }

export type LegalSection = {
  id: string
  title: string
  /** Blocks in a group sit tight; groups are one blank line apart. */
  groups: LegalBlock[][]
}

export type LegalTocEntry = {
  label: string
  sectionId: string
}

export type LegalDocument = {
  badge: string
  title: string
  description: string
  toc: LegalTocEntry[]
  sections: LegalSection[]
}
