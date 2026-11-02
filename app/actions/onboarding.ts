"use server"

import { onboardingSchema } from "@/lib/onboarding/validations"
import type { OnboardingValues } from "@/lib/onboarding/validations"
import type { ActionState } from "@/lib/types"
import { toFieldErrors } from "@/lib/zod-utils"

// TODO(api): stub. The API has no onboarding endpoint yet (docs/API.md Gaps), so
// this validates and returns without saving anything. Add requireRole() here
// once sign-up exists; the flow is public until then.
export const submitOnboardingAction = async (
  input: OnboardingValues
): Promise<ActionState> => {
  const parsed = onboardingSchema.safeParse(input)

  if (!parsed.success) {
    return {
      errors: toFieldErrors(parsed.error),
      message: "Some answers need another look.",
    }
  }

  return { message: "Preview finished. Your details were not saved." }
}
