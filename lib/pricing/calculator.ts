// Pricing calculator copy, plans and recommendation rules.
//
// Prices are read from the plan cards (`plans` in content.ts), so the two
// always agree. Plan names here must match those cards.
//
// TODO(content): the rules in `recommendPlan` and the plan descriptions are
// placeholders agreed for the layout. Replace them before launch.

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
 * where most gyms sit, and the second half 150–500+. Each half is linear.
 */
export const memberScale = {
  min: 10,
  mid: 150,
  max: 500,
  ticks: ["10", "150", "500+"],
}

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
  members >= memberScale.max ? `${memberScale.max}+` : String(members)

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

const calculatorPlans = {
  starter: {
    name: "Starter",
    description: "Everything a single, growing gym needs to run smoothly.",
  },
  gold: {
    name: "Gold",
    description: "A complete solution for growing fitness businesses.",
  },
  platinum: {
    name: "Platinum",
    description: "Built for multi-location gyms that need it all.",
  },
} satisfies Record<string, CalculatorPlan>

// "Rs 14,999" -> currency "Rs", amount "14,999", so the amount can take the
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
  starter: withCardPrice(calculatorPlans.starter),
  gold: withCardPrice(calculatorPlans.gold),
  platinum: withCardPrice(calculatorPlans.platinum),
}

export const recommendPlan = ({
  members,
  locations,
  addOns: selectedAddOns,
}: CalculatorSelection): RecommendedPlan => {
  if (locations > 1) return recommendations.platinum
  if (members > memberScale.mid || selectedAddOns.length > 0) {
    return recommendations.gold
  }
  return recommendations.starter
}
