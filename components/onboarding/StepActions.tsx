import LandingButton from "@/components/landing/primitives/LandingButton"
import { cn } from "@/lib/utils"

const ACTION_CLASS =
  "h-12.5 px-9 transition-[color,background-color,translate,scale] focus-visible:ring-offset-surface-light motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-95"

type StepActionsProps = {
  nextLabel?: string
  isPending?: boolean
  className?: string
  onBack?: () => void
}

const StepActions = ({
  nextLabel = "Next",
  isPending = false,
  className,
  onBack,
}: StepActionsProps) => (
  <div
    className={cn(
      "mt-section-content flex justify-center gap-onboarding-tight",
      className
    )}
  >
    {onBack && (
      <LandingButton
        type="button"
        variant="light"
        onClick={onBack}
        disabled={isPending}
        className={cn(
          ACTION_CLASS,
          "bg-surface-tile font-normal hover:bg-line-light"
        )}
      >
        Back
      </LandingButton>
    )}
    <LandingButton type="submit" disabled={isPending} className={ACTION_CLASS}>
      {nextLabel}
    </LandingButton>
  </div>
)

export default StepActions
