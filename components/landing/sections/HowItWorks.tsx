import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import Typography from "@/components/ui/Typography"
import { howItWorks } from "@/lib/landing/content"

const HowItWorks = () => (
  <Section id="how-we-work" labelledBy="how-title">
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-48">
      <SectionHeader
        intro={howItWorks}
        titleId="how-title"
        titleClassName="max-w-[16.1em]"
      />

      <ol className="flex flex-col gap-10 lg:gap-12.5">
        {howItWorks.steps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[2.1em_1fr] items-start text-step"
          >
            <Typography variant="step" aria-hidden>
              {String(index + 1).padStart(2, "0")}.
            </Typography>
            <div className="flex flex-col gap-2">
              <Typography variant="titleLg">{step.title}</Typography>
              <Typography
                variant="bodyLg"
                className="max-w-[26.65em] opacity-80"
              >
                {step.description}
              </Typography>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </Section>
)

export default HowItWorks
