import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import Typography from "@/components/ui/Typography"
import { aboutStory } from "@/lib/about/content"

// Badge + heading over the right-aligned description (the homepage section
// pattern), then the story paragraphs in columns.
const AboutStory = () => (
  <Section id="who-we-are" labelledBy="story-title">
    <SectionHeader
      intro={aboutStory}
      titleId="story-title"
      titleClassName="max-w-[14em]"
    />
    <div className="reveal-stagger mt-section-content grid gap-6 border-t border-line-dark pt-section-content lg:grid-cols-3 lg:gap-12">
      {aboutStory.paragraphs.map((paragraph) => (
        <Typography
          key={paragraph}
          variant="bodyLg"
          className="text-pretty opacity-80"
        >
          {paragraph}
        </Typography>
      ))}
    </div>
  </Section>
)

export default AboutStory
