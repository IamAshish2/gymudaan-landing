"use client"

import Link from "next/link"
import { Controller, useFormContext, useWatch } from "react-hook-form"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import Typography from "@/components/ui/Typography"
import {
  NOT_PROVIDED,
  onboardingPlans,
  paymentMethods,
} from "@/lib/onboarding/content"
import type { OnboardingValues } from "@/lib/onboarding/validations"
import { ROUTES } from "@/lib/routes"

type ReviewSectionProps = {
  title: string
  rows: { label: string; value: string }[]
  onEdit: () => void
}

const ReviewSection = ({ title, rows, onEdit }: ReviewSectionProps) => (
  <section className="flex flex-col gap-3 rounded-photo border border-line-option px-6.5 py-5">
    <div className="flex items-center justify-between gap-4">
      <Typography variant="bodyLg" as="h2" className="font-medium text-ink">
        {title}
      </Typography>
      <button
        type="button"
        onClick={onEdit}
        aria-label={`Edit ${title}`}
        className="rounded-chip text-body-lg font-medium text-brand outline-none hover:text-brand/85 focus-visible:ring-[3px] focus-visible:ring-brand/60"
      >
        Edit
      </button>
    </div>

    <dl className="flex flex-col gap-2">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex items-baseline justify-between gap-4">
          <Typography variant="body" as="dt" className="text-ink-muted">
            {label}
          </Typography>
          <Typography
            variant="body"
            as="dd"
            className="min-w-0 text-right wrap-anywhere text-ink"
          >
            {value}
          </Typography>
        </div>
      ))}
    </dl>
  </section>
)

type ReviewStepProps = {
  onEditBusiness: () => void
  onEditPlan: () => void
  onEditPayment: () => void
}

const ReviewStep = ({
  onEditBusiness,
  onEditPlan,
  onEditPayment,
}: ReviewStepProps) => {
  const { control } = useFormContext<OnboardingValues>()
  const values = useWatch({ control })

  const plan = onboardingPlans.find((item) => item.id === values.plan)
  const method = paymentMethods.find((item) => item.id === values.paymentMethod)

  return (
    <div className="mx-auto mt-onboarding-tight flex w-full max-w-onboarding-review flex-col gap-5">
      <ReviewSection
        title="Your Business"
        onEdit={onEditBusiness}
        rows={[
          { label: "Business", value: values.businessName ?? "" },
          { label: "Address", value: values.address ?? "" },
          // TODO(content): Figma shows an email here, but no step collects one.
          { label: "Email", value: NOT_PROVIDED },
          { label: "Phone", value: values.phone ?? "" },
          { label: "PAN", value: values.pan || NOT_PROVIDED },
        ]}
      />
      <ReviewSection
        title="Subscription"
        onEdit={onEditPlan}
        rows={[
          { label: "Plan", value: plan?.label ?? "" },
          { label: "Annual Price", value: plan?.price ?? "" },
        ]}
      />
      <ReviewSection
        title="Payment"
        onEdit={onEditPayment}
        rows={[
          { label: "Method", value: method?.label ?? "" },
          {
            label: "Reference",
            value: values.transactionReference || NOT_PROVIDED,
          },
          // TODO(api): fixed Figma value. No payment is taken in this preview.
          { label: "Status", value: "Success" },
        ]}
      />

      <Controller
        name="acceptedTerms"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="-mt-1 gap-2">
            <div className="flex items-start gap-3">
              <Checkbox
                id="onboarding-terms"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                aria-invalid={fieldState.invalid}
                className="mt-1 size-5 rounded-full border-ink-muted focus-visible:ring-brand/60 dark:bg-transparent data-checked:border-brand data-checked:bg-brand data-checked:text-white dark:data-checked:bg-brand"
              />
              <FieldLabel
                htmlFor="onboarding-terms"
                className="block text-body font-normal text-black"
              >
                I have reviewed the information and agree to the applicable{" "}
                <Link
                  href={ROUTES.legal.terms}
                  target="_blank"
                  className="underline hover:text-brand"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href={ROUTES.legal.privacy}
                  target="_blank"
                  className="underline hover:text-brand"
                >
                  Privacy Policy
                </Link>
                .
              </FieldLabel>
            </div>
            {fieldState.invalid && (
              <FieldError
                errors={[fieldState.error]}
                className="text-status-alert"
              />
            )}
          </Field>
        )}
      />
    </div>
  )
}

export default ReviewStep
