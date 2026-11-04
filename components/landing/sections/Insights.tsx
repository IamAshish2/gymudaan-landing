import Section from "@/components/landing/primitives/Section"
import InsightsGallery from "@/components/landing/sections/InsightsGallery"
import { isBlogPublic } from "@/lib/blog/registry"
import { insights } from "@/lib/landing/content"

// Blog teaser cards: hidden while the blog is (production builds until an
// article is published, lib/blog/registry.ts).
const Insights = () =>
  isBlogPublic ? (
    <Section id="insights" labelledBy="insights-title">
      <InsightsGallery intro={insights} items={insights.items} />
    </Section>
  ) : null

export default Insights
