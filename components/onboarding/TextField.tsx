"use client"

import type { ReactNode } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ICheck } from "@/lib/icons"
import {
  onboardingSchema,
  type OnboardingValues,
} from "@/lib/onboarding/validations"
import { cn } from "@/lib/utils"

type TextFieldProps = {
  name:
    | "businessName"
    | "address"
    | "phone"
    | "pan"
    | "discountCode"
    | "transactionReference"
  label: ReactNode
  placeholder: string
  autoComplete?: string
  type?: "text" | "tel"
  labelClassName?: string
}

const TextField = ({
  name,
  label,
  placeholder,
  autoComplete = "off",
  type = "text",
  labelClassName,
}: TextFieldProps) => {
  const { control } = useFormContext<OnboardingValues>()
  const id = `onboarding-${name}`

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isFilled = field.value.trim() !== ""
        const isValid =
          isFilled &&
          onboardingSchema.shape[name].safeParse(field.value).success

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor={id}
              className={cn("text-body font-medium", labelClassName)}
            >
              {label}
            </FieldLabel>
            <div className="relative">
              <Input
                {...field}
                id={id}
                type={type}
                autoComplete={autoComplete}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                className="h-11.25 rounded-field border-transparent bg-surface-tile pr-11 pl-5 text-badge text-ink transition-[background-color,border-color,box-shadow] duration-300 ease-standard placeholder:text-ink-muted focus-visible:border-brand/50 focus-visible:bg-surface-light focus-visible:ring-brand-tint md:text-badge"
              />
              <ICheck
                aria-hidden
                className={cn(
                  "pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-brand transition-[scale,opacity] duration-300 ease-spring motion-reduce:transition-none",
                  isValid ? "scale-100" : "scale-0 opacity-0"
                )}
              />
            </div>
            {fieldState.invalid && (
              <FieldError
                errors={[fieldState.error]}
                className="text-status-alert motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1"
              />
            )}
          </Field>
        )
      }}
    />
  )
}

export default TextField
