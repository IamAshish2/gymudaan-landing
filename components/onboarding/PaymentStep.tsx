"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"

import TextField from "@/components/onboarding/TextField"
import {
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import Typography from "@/components/ui/Typography"
import { onboardingPlans, paymentMethods } from "@/lib/onboarding/content"
import type { OnboardingValues } from "@/lib/onboarding/validations"

const SummaryRow = ({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: string
  emphasis?: boolean
}) => (
  <div className="flex items-center justify-between gap-4">
    <Typography
      variant="bodyLg"
      className={emphasis ? "font-medium text-ink" : "text-ink-muted"}
    >
      {label}
    </Typography>
    <Typography
      variant="bodyLg"
      className={emphasis ? "font-medium text-ink" : "text-black"}
    >
      {value}
    </Typography>
  </div>
)

const PaymentStep = () => {
  const { control } = useFormContext<OnboardingValues>()
  const planId = useWatch({ control, name: "plan" })
  const plan = onboardingPlans.find((item) => item.id === planId)

  return (
    <FieldGroup className="mx-auto mt-section-content max-w-onboarding-form gap-onboarding-tight">
      <section
        aria-label="Order summary"
        className="flex flex-col gap-1 rounded-photo bg-surface-tile px-6.5 py-5.25"
      >
        <SummaryRow label="Selected Plan" value={plan?.label ?? ""} />
        <SummaryRow label="Annual Subscription" value={plan?.price ?? ""} />
        <Separator className="my-3 bg-ink-muted" />
        <SummaryRow
          label="Total before discount"
          value={plan?.price ?? ""}
          emphasis
        />
      </section>

      <TextField
        name="discountCode"
        label="Discount Code (Optional)"
        labelClassName="text-ink-muted"
        placeholder="Enter your discount code"
      />

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <FieldSet className="gap-0">
            <FieldLegend className="mb-4 font-medium text-ink data-[variant=legend]:text-body-lg">
              Choose a Payment Method
            </FieldLegend>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="gap-3"
            >
              {paymentMethods.map((method) => {
                const id = `onboarding-payment-${method.id}`

                return (
                  <div key={method.id} className="flex items-center gap-3">
                    <RadioGroupItem
                      id={id}
                      value={method.id}
                      className="size-5 border-transparent bg-surface-tile focus-visible:ring-brand/60 dark:bg-surface-tile data-checked:border-brand data-checked:bg-brand dark:data-checked:bg-brand [&_[data-slot=radio-group-indicator]>span]:size-1.5 [&_[data-slot=radio-group-indicator]>span]:bg-white"
                    />
                    <FieldLabel
                      htmlFor={id}
                      className="text-body font-normal text-black"
                    >
                      {method.label}
                    </FieldLabel>
                  </div>
                )
              })}
            </RadioGroup>
          </FieldSet>
        )}
      />

      <TextField
        name="transactionReference"
        label="Transaction Reference (Optional)"
        labelClassName="text-black"
        placeholder="Enter transaction reference"
      />
    </FieldGroup>
  )
}

export default PaymentStep
