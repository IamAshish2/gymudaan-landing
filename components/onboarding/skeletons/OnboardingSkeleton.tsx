import { Skeleton } from "@/components/ui/skeleton"
import GridContainer from "@/components/ui/GridContainer"

const SKELETON_CLASS = "bg-surface-tile"

const OnboardingSkeleton = () => (
  <div
    className="flex flex-1 flex-col items-center justify-center px-onboarding-panel-x py-onboarding-panel-y"
    aria-hidden
  >
    <Skeleton className={`h-10 w-full max-w-xl ${SKELETON_CLASS}`} />
    <Skeleton className={`mt-1 h-7 w-full max-w-md ${SKELETON_CLASS}`} />

    <GridContainer className="mt-section-content w-full max-w-onboarding-options gap-onboarding-grid">
      {[0, 1, 2, 3].map((item) => (
        <Skeleton
          key={item}
          className={`col-span-2 aspect-292/258 rounded-chip lg:col-span-3 ${SKELETON_CLASS}`}
        />
      ))}
    </GridContainer>

    <Skeleton
      className={`mt-section-content h-12.5 w-32 rounded-button ${SKELETON_CLASS}`}
    />
  </div>
)

export default OnboardingSkeleton
