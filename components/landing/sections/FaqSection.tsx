import RichTextLine from "@/components/landing/primitives/RichTextLine"
import Section from "@/components/landing/primitives/Section"
import SectionBadge from "@/components/landing/primitives/SectionBadge"
import FaqAccordion from "@/components/landing/sections/FaqAccordion"
import Typography from "@/components/ui/Typography"
import { faq } from "@/lib/landing/content"

// FAQPage structured data, built from the same items the accordion renders.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
}

const FaqSection = () => (
  <Section id="faq" labelledBy="faq-title">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
      }}
    />
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-5">
      <div className="flex flex-col gap-3">
        {faq.badge ? <SectionBadge>{faq.badge}</SectionBadge> : null}
        <Typography variant="display" id="faq-title">
          <RichTextLine text={faq.title} />
        </Typography>
        <Typography variant="bodyLg" className="mt-2 max-w-[29.6em] opacity-80">
          {faq.description}
        </Typography>
      </div>
      <FaqAccordion items={faq.items} defaultOpen={faq.defaultOpen} />
    </div>
  </Section>
)

export default FaqSection
