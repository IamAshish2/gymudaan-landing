import Image from "next/image"

import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import FeatureList from "@/components/landing/sections/FeatureList"
import { features } from "@/lib/landing/content"
import appMockup from "@/public/landing/features/app-mockup.webp"

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

    <div className="mt-section-content grid items-center gap-10 lg:grid-cols-[718fr_772fr] lg:gap-15">
      <FeatureList features={features.items} />

      {/* Figma crops the mockup from the left (node 1:167). */}
      <div className="relative aspect-[772/615] w-full">
        <Image
          src={appMockup}
          alt={features.imageAlt}
          fill
          sizes="(min-width: 1728px) 772px, (min-width: 1024px) 45vw, 92vw"
          className="object-cover object-right"
        />
      </div>
    </div>
  </Section>
)

export default MainFeatures
