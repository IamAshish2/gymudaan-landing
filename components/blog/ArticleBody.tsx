import Typography from "@/components/ui/Typography"
import type { ArticleBlock, ArticleSection } from "@/lib/blog/types"

const Block = ({ block }: { block: ArticleBlock }) => {
  switch (block.kind) {
    case "list":
      return (
        <ul className="flex list-disc flex-col gap-2 pl-7.5 text-body-lg opacity-80 marker:text-brand">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case "quote":
      return (
        <blockquote className="border-l-2 border-brand py-1 pl-6">
          <Typography variant="titleSm">“{block.text}”</Typography>
        </blockquote>
      )
    case "callout":
      return (
        <aside className="rounded-panel border border-line-dark bg-surface-raised px-5 py-5 lg:px-7.5 lg:py-6">
          <Typography as="p" variant="cardTitle" className="text-brand">
            {block.title}
          </Typography>
          <Typography variant="bodyLg" className="mt-1 opacity-80">
            {block.text}
          </Typography>
        </aside>
      )
    default:
      return (
        <Typography variant="bodyLg" className="opacity-80">
          {block.text}
        </Typography>
      )
  }
}

// Article prose: one landmark per section so the sticky contents list can
// follow along, the same reading layout as the legal pages.
const ArticleBody = ({ sections }: { sections: ArticleSection[] }) => (
  <div className="flex min-w-0 flex-col gap-section-content">
    {sections.map((section) => (
      <section
        key={section.id}
        id={section.id}
        aria-labelledby={`${section.id}-title`}
        className="scroll-mt-6"
      >
        <Typography variant="titleLg" as="h2" id={`${section.id}-title`}>
          {section.title}
        </Typography>
        <div className="mt-4 flex flex-col gap-5">
          {section.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </section>
    ))}
  </div>
)

export default ArticleBody
