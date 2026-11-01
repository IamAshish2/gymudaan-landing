import Link from "next/link"

import LandingButton from "@/components/landing/primitives/LandingButton"
import Typography from "@/components/ui/Typography"
import { customPlan } from "@/lib/pricing/content"
import { linkTarget } from "@/lib/site"

const CustomPlanBanner = () => (
  <div className="mt-15 flex flex-col gap-6 rounded-badge border border-line-dark px-5 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8.75 lg:py-7">
    <div className="flex max-w-201 flex-col gap-2">
      <Typography as="h2" variant="titleSm">
        {customPlan.title}
      </Typography>
      <Typography variant="bodyLg" className="opacity-80">
        {customPlan.description}
      </Typography>
    </div>
    <LandingButton asChild className="self-start lg:self-auto">
      <Link href={customPlan.cta.href} {...linkTarget(customPlan.cta.href)}>
        {customPlan.cta.label}
      </Link>
    </LandingButton>
  </div>
)

export default CustomPlanBanner
