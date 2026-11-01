import Link from "next/link"

import Container from "@/components/landing/primitives/Container"
import PageIntro from "@/components/landing/primitives/PageIntro"
import FinalCta from "@/components/landing/sections/FinalCta"
import LegalToc from "@/components/legal/LegalToc"
import Typography from "@/components/ui/Typography"
import type { LegalBlock, LegalDocument, LegalInline } from "@/lib/legal/types"
import { cn } from "@/lib/utils"

const linkClass =
  "rounded-chip underline outline-none hover:text-brand focus-visible:ring-[3px] focus-visible:ring-brand/60"

const Inline = ({ part }: { part: LegalInline }) => {
  if (typeof part === "string") return part

  if ("alert" in part) {
    return <span className="font-medium text-status-alert">{part.alert}</span>
  }

  if (part.href.startsWith("/")) {
    return (
      <Link href={part.href} className={linkClass}>
        {part.link}
      </Link>
    )
  }

  return (
    <a
      href={part.href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {part.link}
    </a>
  )
}

const Block = ({ block }: { block: LegalBlock }) => {
  if (block.kind === "heading") {
    return (
      <Typography as="h3" variant="bodyLg" className="font-medium">
        {block.text}
      </Typography>
    )
  }

  if (block.kind === "list") {
    return (
      <ul
        className={cn(
          "list-disc pl-7.5 text-body-lg",
          block.medium && "font-medium"
        )}
      >
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  const parts = typeof block.text === "string" ? [block.text] : block.text

  return (
    <Typography variant="bodyLg" className={cn(block.medium && "font-medium")}>
      {parts.map((part, index) => (
        <Inline key={index} part={part} />
      ))}
    </Typography>
  )
}

type LegalPageProps = {
  document: LegalDocument
}

// Shared layout of the Terms and Privacy frames: intro, sticky contents beside
// the text, then the closing CTA band.
const LegalPage = ({ document }: LegalPageProps) => (
  <>
    <PageIntro
      badge={document.badge}
      title={document.title}
      description={document.description}
    />

    <div className="pt-section-content pb-section text-white lg:pt-21">
      <Container className="grid gap-10 lg:grid-cols-[30.3%_minmax(0,1034px)]">
        <LegalToc entries={document.toc} />

        <div className="flex min-w-0 flex-col gap-section">
          {document.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-6"
            >
              <Typography variant="titleLg" as="h2" id={`${section.id}-title`}>
                {section.title}
              </Typography>
              <div className="mt-4 flex flex-col gap-[1lh] text-body-lg">
                {section.groups.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    {group.map((block, blockIndex) => (
                      <Block key={blockIndex} block={block} />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </div>

    <FinalCta />
  </>
)

export default LegalPage
