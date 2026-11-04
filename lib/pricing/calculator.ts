// Pricing calculator copy, plans and recommendation rules.
//
// Prices are read from the plan cards (`plans` in content.ts), so the two
// always agree. Plan names here must match those cards.
//
// The recommendation follows the live plan limits (lib/pricing/content.ts):
// Standard covers up to 800 members at one location, Gold has unlimited
// members, and only Platinum includes multi-branch. Access control is in
// every plan, so add-ons don't change the recommendation.
// TODO(content): confirm the "Membership Card" add-on is sold (it isn't on
// the live /plans page) and whether add-ons carry their own price.

import type { SectionIntro } from "@/lib/landing/types"
import { plans } from "@/lib/pricing/content"
import type {
  CalculatorAddOn,
  CalculatorPlan,
  CalculatorSelection,
  RecommendedPlan,
} from "@/lib/pricing/types"
import { ROUTES } from "@/lib/routes"

export const calculatorIntro: SectionIntro = {
  badge: "Pricing Calculator",
  title: ["Build your Plan"],
  description: "Answer a few questions and get a plan that fits your gym.",
}

export const calculatorText = {
  makePlan: {
    title: "Make your plan",
    description: "Customise it to your members and locations.",
  },
  members: {
    title: "Active Members",
    description: "Total members you have at your gym.",
    unit: "members",
  },
  locations: {
    title: "Locations",
    description: "How many locations do you operate?",
    decrease: "Remove a location",
    increase: "Add a location",
  },
  addOns: {
    title: "Add-ons",
    optional: "(Optional)",
    description: "Extend your plan with additional tools.",
  },
  result: {
    badge: "Recommended Plan",
    period: "/year",
    summaryLabel: "Your selection",
    members: "Active Members",
    locations: "Locations",
    addOns: "Add-ons",
    cta: { label: "Get Started", href: ROUTES.onboarding },
  },
}

export const MIN_LOCATIONS = 1
export const MAX_LOCATIONS = 20

/**
 * The slider runs 0–100 but members do not: the first half covers 10–150,
 * where most gyms sit, and the second half 150–1,000+. Each half is linear.
 * The top reaches past Standard's 800-member limit, so Gold can be suggested.
 */
export const memberScale = {
  min: 10,
  mid: 150,
  max: 1000,
  ticks: ["10", "150", "1,000+"],
}

/** Standard plan's member limit ("Members: Up to 800"). */
export const STANDARD_MEMBER_LIMIT = 800

export const sliderToMembers = (position: number): number => {
  const { min, mid, max } = memberScale

  if (position <= 50) {
    return Math.round((min + ((mid - min) * position) / 50) / 5) * 5
  }

  return Math.round((mid + ((max - mid) * (position - 50)) / 50) / 10) * 10
}

export const membersToSlider = (members: number): number => {
  const { min, mid, max } = memberScale

  if (members <= mid) return ((members - min) / (mid - min)) * 50

  return 50 + ((members - mid) / (max - mid)) * 50
}

export const formatMembers = (members: number): string =>
  members >= memberScale.max
    ? `${memberScale.max.toLocaleString("en-US")}+`
    : String(members)

export const addOns: CalculatorAddOn[] = [
  {
    id: "door-access",
    label: "Door Access Control",
    description: "Manage gym entry with a compatible access device.",
  },
  {
    id: "membership-card",
    label: "Membership Card",
    description: "Give every member a card for gym access.",
  },
]

export const initialSelection: CalculatorSelection = {
  members: 120,
  locations: 1,
  addOns: ["door-access"],
}

// Names and descriptions match the plan cards (the live plans' taglines).
const calculatorPlans = {
  standard: {
    name: "Standard",
    description: "For small gyms getting started",
  },
  gold: {
    name: "Gold",
    description: "Ideal for growing gym branches",
  },
  platinum: {
    name: "Platinum",
    description: "Full-scale multi-branch management",
  },
} satisfies Record<string, CalculatorPlan>

// "NPR 14,999" -> currency "NPR", amount "14,999", so the amount can take the
// brand colour as in the draft.
const withCardPrice = (plan: CalculatorPlan): RecommendedPlan => {
  const card = plans.find(({ name }) => name === plan.name)
  if (!card) {
    throw new Error(`Pricing calculator: no plan card named "${plan.name}"`)
  }

  const match = /^(\D*?)\s*(\d[\d,.]*)$/.exec(card.price.trim())

  return {
    ...plan,
    currency: match?.[1] ?? "",
    amount: match?.[2] ?? card.price,
  }
}

const recommendations = {
  standard: withCardPrice(calculatorPlans.standard),
  gold: withCardPrice(calculatorPlans.gold),
  platinum: withCardPrice(calculatorPlans.platinum),
}

// Multi-branch is Platinum-only; more members than Standard allows needs
// Gold; otherwise Standard covers it. Add-ons are available on every plan.
export const recommendPlan = ({
  members,
  locations,
}: CalculatorSelection): RecommendedPlan => {
  if (locations > 1) return recommendations.platinum
  if (members > STANDARD_MEMBER_LIMIT) return recommendations.gold
  return recommendations.standard
}
