import { z } from "zod"

import {
  businessTypes,
  goals,
  memberRanges,
  onboardingPlans,
  paymentMethods,
  tools,
} from "@/lib/onboarding/content"

const idsOf = (items: { id: string }[]) => items.map((item) => item.id)

const oneOf = (items: { id: string }[], message: string) => {
  const ids = idsOf(items)

  return z.string().refine((value) => ids.includes(value), { error: message })
}

const someOf = (items: { id: string }[], message: string) => {
  const ids = idsOf(items)

  return z
    .array(z.string().refine((value) => ids.includes(value)))
    .min(1, { error: message })
}

export const onboardingSchema = z.object({
  businessType: oneOf(businessTypes, "Select your business type to continue"),
  members: oneOf(memberRanges, "Select your member count to continue"),
  goals: someOf(goals, "Select at least one option to continue"),
  tools: someOf(tools, "Select at least one option to continue"),
  plan: oneOf(onboardingPlans, "Select a plan to continue"),
  businessName: z
    .string()
    .trim()
    .min(1, { error: "Enter your gym or business name" })
    .max(120, { error: "Keep this under 120 characters" }),
  address: z
    .string()
    .trim()
    .min(1, { error: "Enter your business address" })
    .max(200, { error: "Keep this under 200 characters" }),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s-]{6,19}$/, { error: "Enter a valid phone number" }),
  pan: z.string().trim().max(20, { error: "Keep this under 20 characters" }),
  discountCode: z
    .string()
    .trim()
    .max(50, { error: "Keep this under 50 characters" }),
  paymentMethod: oneOf(paymentMethods, "Choose a payment method"),
  transactionReference: z
    .string()
    .trim()
    .max(100, { error: "Keep this under 100 characters" }),
  acceptedTerms: z.boolean().refine((value) => value, {
    error: "Accept the Terms and Privacy Policy to finish",
  }),
})

export type OnboardingValues = z.infer<typeof onboardingSchema>

// Nothing is pre-selected on the choice steps, so an answer is never saved that
// the user didn't pick. Figma shows the first card selected only as a state demo.
export const onboardingDefaultValues: OnboardingValues = {
  businessType: "",
  members: "",
  goals: [],
  tools: [],
  plan: "",
  businessName: "",
  address: "",
  phone: "",
  pan: "",
  discountCode: "",
  paymentMethod: "bank-transfer",
  transactionReference: "",
  acceptedTerms: false,
}

/** Fields each step must pass before Next moves on, in flow order. */
export const STEP_FIELDS: (keyof OnboardingValues)[][] = [
  ["businessType"],
  ["members"],
  ["goals"],
  ["tools"],
  ["businessName", "address", "phone", "pan"],
  ["plan"],
  ["discountCode", "paymentMethod", "transactionReference"],
  ["acceptedTerms"],
]

export const TOTAL_STEPS = STEP_FIELDS.length
