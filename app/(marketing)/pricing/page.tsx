import type { Metadata } from "next"

import Container from "@/components/landing/primitives/Container"
import PageIntro from "@/components/landing/primitives/PageIntro"
import ClientLogoList from "@/components/landing/sections/ClientLogoList"
import FaqSection from "@/components/landing/sections/FaqSection"
import BillingSwitch from "@/components/pricing/BillingSwitch"
import CustomPlanBanner from "@/components/pricing/CustomPlanBanner"
import PlanCard from "@/components/pricing/PlanCard"
import PlanMatrix from "@/components/pricing/PlanMatrix"
import Typography from "@/components/ui/Typography"
import { plans, pricingIntro, trustedTitle } from "@/lib/pricing/content"

export const metadata: Metadata = {
  title: "Pricing",
  description: pricingIntro.description,
}

// Section order follows Figma frame 1:721.
const PricingPage = () => (
  <>
    <PageIntro
      badge={pricingIntro.badge}
      title={pricingIntro.title}
      description={pricingIntro.description}
      titleClassName="max-w-[20em]"
      descriptionClassName="max-w-[36em]"
    >
      <BillingSwitch />
    </PageIntro>

    <section aria-label="Plans" className="pt-15 text-white">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[492fr_507fr_492fr] lg:gap-5">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
        <CustomPlanBanner />
      </Container>
    </section>

    <section aria-labelledby="trusted-title" className="pt-section text-white">
      <Container>
        <Typography
          variant="bodyLg"
          as="h2"
          id="trusted-title"
          className="text-center font-medium"
        >
          {trustedTitle}
        </Typography>
        <ClientLogoList className="mt-8 lg:mt-15" />
      </Container>
    </section>

    <PlanMatrix />
    <FaqSection />
  </>
)

export default PricingPage
