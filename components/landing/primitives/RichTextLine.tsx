import type { RichText } from "@/lib/landing/types"

type RichTextLineProps = {
  text: RichText
}

// Renders heading segments: `{ em }` picks up the brand colour from the
// heading's `[&_em]` styles, `{ muted }` drops to 60% like the Figma copy.
const RichTextLine = ({ text }: RichTextLineProps) => (
  <>
    {text.map((segment, index) => {
      if (typeof segment === "string") return segment

      if ("em" in segment) return <em key={index}>{segment.em}</em>

      return (
        <span key={index} className="opacity-60">
          {segment.muted}
        </span>
      )
    })}
  </>
)

export default RichTextLine
