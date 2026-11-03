import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import FeatureShowcase from "@/components/landing/sections/FeatureShowcase"
import { features } from "@/lib/landing/content"

const MainFeatures = () => (
  <Section
    id="features"
    labelledBy="features-title"
    className="pb-[calc(var(--spacing-section)*0.75)]"
  >
    <SectionHeader
      intro={features}
      titleId="features-title"
      titleClassName="max-w-[17em]"
    />

    <FeatureShowcase features={features.items} />
  </Section>
)

export default MainFeatures
