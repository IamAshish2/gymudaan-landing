import OptionArtImage from "@/components/onboarding/OptionArtImage"
import type { OnboardingOption } from "@/lib/onboarding/types"

// Fetches the next step's art out of sight, so it's ready when the step slides
// in instead of popping in mid-animation.
const ArtPreloader = ({ options }: { options: OnboardingOption[] }) => (
  <div
    aria-hidden
    className="pointer-events-none absolute size-px overflow-hidden opacity-0"
  >
    {options.map((option) => (
      <OptionArtImage key={option.id} art={option.art} />
    ))}
  </div>
)

export default ArtPreloader
