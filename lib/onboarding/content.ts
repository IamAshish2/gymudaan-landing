// Onboarding copy, options and plans (Figma "template" file, frames 10:11 to
// 10:294). Crop values are the exact Figma image fills.

import type {
  LabelledValue,
  OnboardingOption,
  OnboardingPlan,
  OnboardingStepCopy,
  OptionArt,
} from "@/lib/onboarding/types"

const SHEET_WIDTH = 2172
const SHEET_HEIGHT = 724

const fromSheet = (
  src: string,
  slotWidth: number,
  crop: OptionArt["crop"]
): OptionArt => ({
  src,
  sheetWidth: SHEET_WIDTH,
  sheetHeight: SHEET_HEIGHT,
  slotWidth,
  crop,
})

const BUSINESS_SHEET = "/onboarding/business-sheet.webp"
const MEMBERS_SHEET = "/onboarding/members-sheet.webp"
const GOALS_SHEET = "/onboarding/goals-sheet.webp"
const TOOLS_SHEET = "/onboarding/tools-sheet.webp"
const PLANS_SHEET = "/onboarding/plans-sheet.webp"

export const businessTypes: OnboardingOption[] = [
  {
    id: "traditional-gym",
    label: "Traditional Gym",
    art: {
      src: "/onboarding/business-gym.webp",
      sheetWidth: 1448,
      sheetHeight: 1086,
      slotWidth: 216,
      crop: { width: 129.63, height: 116.03, left: -14.68, top: -13.25 },
    },
  },
  {
    id: "fitness-studio",
    label: "Fitness Studio",
    art: fromSheet(BUSINESS_SHEET, 220, {
      width: 300,
      height: 121.27,
      left: -8.56,
      top: -13.4,
    }),
  },
  {
    id: "personal-training",
    label: "Personal Training",
    art: fromSheet(BUSINESS_SHEET, 202, {
      width: 329.59,
      height: 122.5,
      left: -119.27,
      top: -15.23,
    }),
  },
  {
    id: "other",
    label: "Other Fitness Business",
    art: fromSheet(BUSINESS_SHEET, 197, {
      width: 326.13,
      height: 118.11,
      left: -216.37,
      top: -10.6,
    }),
  },
]

export const memberRanges: OnboardingOption[] = [
  {
    id: "under-50",
    label: "Under 50",
    art: fromSheet(MEMBERS_SHEET, 173, {
      width: 648.36,
      height: 206.86,
      left: -49.55,
      top: -54,
    }),
  },
  {
    id: "50-200",
    label: "50 - 200",
    art: fromSheet(MEMBERS_SHEET, 193, {
      width: 582.31,
      height: 206.86,
      left: -171.58,
      top: -54,
    }),
  },
  {
    id: "200-500",
    label: "200 - 500",
    art: fromSheet(MEMBERS_SHEET, 193, {
      width: 582.31,
      height: 206.86,
      left: -300,
      top: -54,
    }),
  },
  {
    id: "500-plus",
    label: "500+",
    art: fromSheet(MEMBERS_SHEET, 199, {
      width: 565.62,
      height: 206.86,
      left: -423.96,
      top: -54,
    }),
  },
]

export const goals: OnboardingOption[] = [
  {
    id: "manage-members",
    label: "Manage Members",
    art: fromSheet(GOALS_SHEET, 203, {
      width: 467.1,
      height: 174.46,
      left: -18.92,
      top: -40.48,
    }),
  },
  {
    id: "track-attendance",
    label: "Track Attendance",
    art: fromSheet(GOALS_SHEET, 208, {
      width: 456.3,
      height: 174.46,
      left: -123.53,
      top: -40.48,
    }),
  },
  {
    id: "simplify-payments",
    label: "Simplify Payments",
    art: fromSheet(GOALS_SHEET, 204, {
      width: 464.1,
      height: 174.46,
      left: -235.9,
      top: -40.48,
    }),
  },
  {
    id: "grow-revenue",
    label: "Grow Revenue",
    art: fromSheet(GOALS_SHEET, 192, {
      width: 493.64,
      height: 174.46,
      left: -369.55,
      top: -40.48,
    }),
  },
]

export const tools: OnboardingOption[] = [
  {
    id: "web-dashboard",
    label: "Web Dashboard",
    art: fromSheet(TOOLS_SHEET, 196, {
      width: 442.36,
      height: 159.47,
      left: -17.92,
      top: -30.84,
    }),
  },
  {
    id: "mobile-access",
    label: "Mobile Access",
    art: fromSheet(TOOLS_SHEET, 180, {
      width: 481.6,
      height: 159.47,
      left: -133.48,
      top: -30.84,
    }),
  },
  {
    id: "reports-analytics",
    label: "Reports & Analytics",
    art: fromSheet(TOOLS_SHEET, 183, {
      width: 472.17,
      height: 159.47,
      left: -234.57,
      top: -30.84,
    }),
  },
  {
    id: "social-integrations",
    label: "Social Integrations",
    art: fromSheet(TOOLS_SHEET, 198, {
      width: 437.02,
      height: 159.47,
      left: -317.51,
      top: -30.84,
    }),
  },
]

// TODO(content): prices come from the onboarding Figma and don't match the
// placeholder plans in lib/pricing/content.ts (docs/API.md Gaps). Features come
// from the comparison matrix there, reading its first column as Standard.
export const onboardingPlans: OnboardingPlan[] = [
  {
    id: "standard",
    label: "Standard",
    price: "Rs. 14,999",
    yearlyPrice: "Rs. 14,999/year",
    features: [
      "Up to 800 members",
      "100 message credits",
      "Finance management",
    ],
    art: fromSheet(PLANS_SHEET, 171, {
      width: 408.27,
      height: 128.37,
      left: -26.13,
      top: -13.48,
    }),
  },
  {
    id: "gold",
    label: "Gold",
    price: "Rs. 19,999",
    yearlyPrice: "Rs. 19,999/year",
    features: [
      "Unlimited members",
      "500 message credits",
      "POS billing & inventory",
    ],
    popular: true,
    art: fromSheet(PLANS_SHEET, 188, {
      width: 370.65,
      height: 128.37,
      left: -135.15,
      top: -13.48,
    }),
  },
  {
    id: "platinum",
    label: "Platinum",
    price: "Rs. 24,999",
    yearlyPrice: "Rs. 24,999/year",
    features: [
      "Unlimited members",
      "800 message credits",
      "Multi-branch management",
    ],
    art: fromSheet(PLANS_SHEET, 180, {
      width: 387.86,
      height: 128.37,
      left: -261.07,
      top: -13.48,
    }),
  },
]

// TODO(content): a starting mapping, not a business rule. Confirm before launch.
export const recommendedPlanByMembers: Record<string, string> = {
  "under-50": "standard",
  "50-200": "gold",
  "200-500": "gold",
  "500-plus": "platinum",
}

/** Options shown on each card step, in flow order, for loading art ahead. */
export const optionsByStep = [
  businessTypes,
  memberRanges,
  goals,
  tools,
  onboardingPlans,
]

export const paymentMethods: LabelledValue[] = [
  { id: "bank-transfer", label: "Bank Transfer" },
  { id: "wallet-transfer", label: "Wallet Transfer" },
]

export const stepCopy = {
  businessType: {
    title: "What type of fitness business do you run?",
    subtitle: "We'll tailor your experience to your business.",
  },
  members: {
    title: "How many clients or members do you manage?",
    subtitle: "This helps us understand the size of your business.",
  },
  goals: {
    title: "What would you like to improve?",
    subtitle: "Select all that matter to your business.",
  },
  tools: {
    title: "Which tools matter most to you?",
    subtitle: "Choose the features you're most interested in.",
  },
  plan: {
    title: "Choose a plan for your gym",
    subtitle: "Select the subscription you'd like to continue with.",
  },
  business: {
    title: "Tell us about your gym",
    subtitle: "We'll use these details to set up your account.",
  },
  payment: {
    title: "Complete your subscription",
    subtitle: "Review your plan and choose how you'd like to pay.",
  },
  review: {
    title: "Review your information",
    subtitle: "Make sure everything looks right before submitting.",
  },
} satisfies Record<string, OnboardingStepCopy>

export const finishCopy = {
  title: (businessName: string) => `You're all set, ${businessName}`,
  subtitle: "Here's what you've chosen. Welcome to Gym Udaan.",
  cta: "Go to home",
}

export const NOT_PROVIDED = "Not Provided"
