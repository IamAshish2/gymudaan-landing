import Section from "@/components/landing/primitives/Section"
import InsightsGallery from "@/components/landing/sections/InsightsGallery"
import { insights } from "@/lib/landing/content"

const Insights = () => (
  <Section id="insights" labelledBy="insights-title">
    <InsightsGallery intro={insights} items={insights.items} />
  </Section>
)

export default Insights
