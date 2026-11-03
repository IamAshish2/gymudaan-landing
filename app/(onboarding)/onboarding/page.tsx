import type { Metadata } from "next"
import { Suspense } from "react"

import OnboardingWizard from "@/components/onboarding/OnboardingWizard"
import OnboardingSkeleton from "@/components/onboarding/skeletons/OnboardingSkeleton"

export const metadata: Metadata = {
  title: "Get started",
  robots: { index: false, follow: false },
}

const OnboardingPage = () => (
  <Suspense fallback={<OnboardingSkeleton />}>
    <OnboardingWizard />
  </Suspense>
)

export default OnboardingPage
