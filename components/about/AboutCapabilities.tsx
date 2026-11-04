import Link from "next/link"

import LandingButton from "@/components/landing/primitives/LandingButton"
import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import Typography from "@/components/ui/Typography"
import { aboutCapabilities } from "@/lib/about/content"

const AboutCapabilities = () => (
  <Section id="what-we-do" labelledBy="capabilities-title">
    <SectionHeader
      intro={aboutCapabilities}
      titleId="capabilities-title"
      titleClassName="max-w-[13em]"
    />
    <ul className="reveal-stagger mt-section-content grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {aboutCapabilities.items.map((item, index) => (
        <li
          key={item.title}
          className="flex flex-col gap-3 rounded-card border border-line-dark bg-surface-raised p-6 transition-colors duration-300 ease-standard hover:border-brand/40 motion-reduce:transition-none lg:p-8"
        >
          <Typography
            variant="badge"
            as="span"
            aria-hidden
            className="text-brand"
          >
            {String(index + 1).padStart(2, "0")}
          </Typography>
          <Typography variant="cardTitle">{item.title}</Typography>
          <Typography variant="body" className="opacity-80">
            {item.description}
          </Typography>
        </li>
      ))}
    </ul>
    <div className="mt-section-content flex justify-center">
      <LandingButton asChild>
        <Link href={aboutCapabilities.cta.href}>
          {aboutCapabilities.cta.label}
        </Link>
      </LandingButton>
    </div>
  </Section>
)

export default AboutCapabilities
