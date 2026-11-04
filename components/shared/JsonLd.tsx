import { serializeJsonLd } from "@/lib/seo/json-ld"

type JsonLdProps = {
  data: Record<string, unknown>
}

// Structured data block (builders in lib/seo/json-ld.ts).
const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
  />
)

export default JsonLd
