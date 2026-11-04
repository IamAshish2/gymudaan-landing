import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import Typography from "@/components/ui/Typography"
import { aboutPrinciples } from "@/lib/about/content"

// Sits in the light band, so it uses the light tone like Who We Serve.
const AboutPrinciples = () => (
  <Section id="how-we-build" labelledBy="principles-title" tone="light">
    <SectionHeader
      intro={aboutPrinciples}
      titleId="principles-title"
      tone="light"
      titleClassName="max-w-[14em]"
    />
    <ul className="reveal-stagger mt-section-content grid gap-5 sm:grid-cols-2">
      {aboutPrinciples.items.map((item) => (
        <li
          key={item.title}
          className="flex flex-col gap-2 rounded-card border border-line-light bg-surface-tile p-6 lg:p-9"
        >
          <span aria-hidden className="mb-2 h-1 w-10 rounded-full bg-brand" />
          <Typography variant="titleLg">{item.title}</Typography>
          <Typography variant="bodyLg" className="opacity-80">
            {item.description}
          </Typography>
        </li>
      ))}
    </ul>
  </Section>
)

export default AboutPrinciples
