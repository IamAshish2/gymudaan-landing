import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import Typography from "@/components/ui/Typography"
import { aboutCompany, aboutSocials } from "@/lib/about/content"
import { linkTarget } from "@/lib/site"

const linkClass =
  "underline-offset-4 outline-none transition-colors duration-300 ease-standard hover:text-brand focus-visible:text-brand focus-visible:underline motion-reduce:transition-none"

// Name, company, location and contact as plain text, matching the
// Organization JSON-LD on this page.
const AboutCompany = () => (
  <Section id="company" labelledBy="company-title">
    <SectionHeader
      intro={aboutCompany}
      titleId="company-title"
      titleClassName="max-w-[12em]"
    />
    <dl className="reveal-stagger mt-section-content grid gap-px overflow-hidden rounded-card border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
      {aboutCompany.facts.map((fact) => (
        <div
          key={fact.label}
          className="flex flex-col gap-2 bg-surface-dark p-6 lg:p-8"
        >
          <Typography as="dt" variant="body" className="opacity-60">
            {fact.label}
          </Typography>
          <Typography as="dd" variant="titleSm">
            {fact.href ? (
              <a
                href={fact.href}
                className={linkClass}
                {...linkTarget(fact.href)}
              >
                {fact.value}
              </a>
            ) : (
              fact.value
            )}
          </Typography>
        </div>
      ))}
      <div className="flex flex-col gap-2 bg-surface-dark p-6 lg:p-8">
        <Typography as="dt" variant="body" className="opacity-60">
          Follow us
        </Typography>
        <Typography
          as="dd"
          variant="titleSm"
          className="flex flex-wrap gap-x-5 gap-y-1"
        >
          {aboutSocials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className={linkClass}
              {...linkTarget(social.href)}
            >
              {social.label}
            </a>
          ))}
        </Typography>
      </div>
    </dl>
  </Section>
)

export default AboutCompany
