import TextField from "@/components/onboarding/TextField"
import { FieldGroup } from "@/components/ui/field"

const BusinessStep = () => (
  <FieldGroup className="mx-auto mt-section-content max-w-onboarding-form gap-8">
    <TextField
      name="businessName"
      label="Gym/Business Name"
      placeholder="Enter your gym name here"
      autoComplete="organization"
    />
    <TextField
      name="address"
      label="Business Address"
      placeholder="Enter your business address"
      autoComplete="street-address"
    />
    <div className="grid gap-x-4.5 gap-y-8 sm:grid-cols-2">
      <TextField
        name="phone"
        type="tel"
        label="Phone Number"
        placeholder="Enter your phone number"
        autoComplete="tel"
      />
      <TextField
        name="pan"
        label={
          <>
            Pan Number <span className="text-ink-muted">(Optional)</span>
          </>
        }
        placeholder="Enter your PAN number"
      />
    </div>
  </FieldGroup>
)

export default BusinessStep
