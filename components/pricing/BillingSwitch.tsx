import Typography from "@/components/ui/Typography"
import { billing } from "@/lib/pricing/content"

// Static for now: only yearly prices exist, so the switch shows Yearly as
// selected and is disabled. Give it state once `plans` has monthly prices.
const BillingSwitch = () => (
  <div className="mt-6 flex items-center gap-4 lg:mt-7">
    <Typography as="span" variant="cardTitle" className="opacity-50">
      {billing.monthly}
    </Typography>
    <button
      type="button"
      role="switch"
      aria-checked
      aria-label={`${billing.yearly} billing`}
      disabled
      className="flex h-8 w-15.75 shrink-0 items-center justify-end rounded-full bg-switch-track px-1.25"
    >
      <span aria-hidden className="size-6.25 rounded-full bg-brand" />
    </button>
    <Typography as="span" variant="cardTitle">
      {billing.yearly}
    </Typography>
  </div>
)

export default BillingSwitch
