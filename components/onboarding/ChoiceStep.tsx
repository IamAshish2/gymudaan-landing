"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"

import OptionCard from "@/components/onboarding/OptionCard"
import { STEP_TITLE_ID } from "@/components/onboarding/StepHeader"
import { FieldError } from "@/components/ui/field"
import GridContainer from "@/components/ui/GridContainer"
import { recommendedPlanByMembers } from "@/lib/onboarding/content"
import type { OnboardingOption, OnboardingPlan } from "@/lib/onboarding/types"
import type { OnboardingValues } from "@/lib/onboarding/validations"
import { cn } from "@/lib/utils"

type ChoiceStepProps = {
  name: "businessType" | "members" | "goals" | "tools" | "plan"
  options: (OnboardingOption | OnboardingPlan)[]
  multiple?: boolean
  layout?: "options" | "plans"
}

const ChoiceStep = ({
  name,
  options,
  multiple = false,
  layout = "options",
}: ChoiceStepProps) => {
  const { control } = useFormContext<OnboardingValues>()
  const isPlans = layout === "plans"
  const members = useWatch({ control, name: "members" })
  const recommendedId = recommendedPlanByMembers[members]

  const tagFor = (option: OnboardingOption | OnboardingPlan) => {
    if (!isPlans) return undefined
    if (option.id === recommendedId) return "Recommended"

    return "popular" in option && option.popular ? "Popular" : undefined
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected = Array.isArray(field.value)
          ? field.value
          : [field.value]

        const toggle = (id: string) => {
          if (!multiple) {
            field.onChange(id)
            return
          }

          field.onChange(
            selected.includes(id)
              ? selected.filter((value) => value !== id)
              : [...selected, id]
          )
        }

        return (
          <div
            className={cn(
              "mt-section-content flex flex-col items-center gap-4",
              isPlans && "pt-onboarding-tab lg:pt-10.5"
            )}
          >
            <div
              role={multiple ? "group" : "radiogroup"}
              aria-labelledby={STEP_TITLE_ID}
              className="w-full"
            >
              <GridContainer
                className={cn(
                  "mx-auto w-full",
                  isPlans
                    ? "max-w-onboarding-plans gap-x-onboarding-grid gap-y-11"
                    : "max-w-onboarding-options gap-onboarding-grid"
                )}
              >
                {options.map((option, index) => {
                  const plan = "yearlyPrice" in option ? option : undefined

                  return (
                    <div
                      key={option.id}
                      className={cn(
                        isPlans ? "col-span-4" : "col-span-2 lg:col-span-3",
                        plan?.popular && "lg:-my-3"
                      )}
                    >
                      <OptionCard
                        groupName={name}
                        type={multiple ? "checkbox" : "radio"}
                        label={option.label}
                        art={option.art}
                        price={plan?.yearlyPrice}
                        features={plan?.features}
                        tag={tagFor(option)}
                        featured={plan?.popular}
                        checked={selected.includes(option.id)}
                        index={index}
                        onToggle={() => toggle(option.id)}
                      />
                    </div>
                  )
                })}
              </GridContainer>
            </div>

            {fieldState.invalid && (
              <FieldError
                errors={[fieldState.error]}
                className="text-status-alert motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1"
              />
            )}
          </div>
        )
      }}
    />
  )
}

export default ChoiceStep
