import Link from "next/link"

import LandingLogo from "@/components/landing/layout/LandingLogo"
import { Progress } from "@/components/ui/progress"
import Typography from "@/components/ui/Typography"
import { TOTAL_STEPS } from "@/lib/onboarding/validations"
import { ROUTES } from "@/lib/routes"

type OnboardingHeaderProps = {
  step: number
  isComplete?: boolean
}

const OnboardingHeader = ({
  step,
  isComplete = false,
}: OnboardingHeaderProps) => (
  <header className="px-onboarding-panel-x pt-6">
    <div className="flex items-center justify-between gap-4">
      <Link
        href={ROUTES.home}
        aria-label="Gym Udaan home"
        className="rounded-chip text-ink outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60"
      >
        <LandingLogo className="text-ink [&_img]:brightness-0 lg:[&_img]:h-9" />
      </Link>
      <Typography variant="badge" className="text-ink-muted">
        {isComplete ? "Complete" : `Step ${step} of ${TOTAL_STEPS}`}
      </Typography>
    </div>

    <Progress
      value={isComplete ? 100 : (step / TOTAL_STEPS) * 100}
      aria-label="Onboarding progress"
      className="mt-4 h-1 bg-line-light [&>[data-slot=progress-indicator]]:bg-brand [&>[data-slot=progress-indicator]]:duration-500 [&>[data-slot=progress-indicator]]:ease-emphasized motion-reduce:[&>[data-slot=progress-indicator]]:transition-none"
    />
  </header>
)

export default OnboardingHeader
