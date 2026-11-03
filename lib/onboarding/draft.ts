import { z } from "zod"

import type { OnboardingValues } from "@/lib/onboarding/validations"
import { TOTAL_STEPS } from "@/lib/onboarding/validations"

// Keeps answers across a refresh, for this browser tab only. Browser-only: call
// from the client. The terms checkbox is left out so it's always a fresh choice.
const VALUES_KEY = "gymudaan:onboarding:values"
const STEP_KEY = "gymudaan:onboarding:step"

const draftValuesSchema = z.object({
  businessType: z.string(),
  members: z.string(),
  goals: z.array(z.string()),
  tools: z.array(z.string()),
  plan: z.string(),
  businessName: z.string(),
  address: z.string(),
  phone: z.string(),
  pan: z.string(),
  discountCode: z.string(),
  paymentMethod: z.string(),
  transactionReference: z.string(),
})

type OnboardingDraft = {
  values: Partial<OnboardingValues>
  furthestStep: number
}

export const readDraft = (): OnboardingDraft => {
  try {
    const parsed = draftValuesSchema.safeParse(
      JSON.parse(sessionStorage.getItem(VALUES_KEY) ?? "null")
    )
    const step = Number(sessionStorage.getItem(STEP_KEY))

    return {
      values: parsed.success ? parsed.data : {},
      furthestStep:
        parsed.success && Number.isInteger(step)
          ? Math.min(Math.max(step, 1), TOTAL_STEPS)
          : 1,
    }
  } catch {
    return { values: {}, furthestStep: 1 }
  }
}

// Storage can be full or blocked; the flow still works without a draft.
export const writeDraftValues = (values: OnboardingValues) => {
  try {
    sessionStorage.setItem(
      VALUES_KEY,
      JSON.stringify(draftValuesSchema.parse(values))
    )
  } catch {}
}

export const writeDraftStep = (step: number) => {
  try {
    sessionStorage.setItem(STEP_KEY, String(step))
  } catch {}
}

export const clearDraft = () => {
  try {
    sessionStorage.removeItem(VALUES_KEY)
    sessionStorage.removeItem(STEP_KEY)
  } catch {}
}
