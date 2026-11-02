import Typography from "@/components/ui/Typography"
import type { OnboardingStepCopy } from "@/lib/onboarding/types"

export const STEP_TITLE_ID = "onboarding-step-title"

const StepHeader = ({ title, subtitle }: OnboardingStepCopy) => (
  <header className="flex flex-col gap-1 text-center">
    <Typography variant="title" as="h1" id={STEP_TITLE_ID}>
      {title}
    </Typography>
    <Typography variant="bodyLg" className="text-ink-muted">
      {subtitle}
    </Typography>
  </header>
)

export default StepHeader
