// Pricing page copy, plans and comparison matrix (Figma frame 1:721).

import type { Plan, PlanFeature, PlanMatrixGroup } from "@/lib/pricing/types"
import { SITE } from "@/lib/site"

export const pricingIntro = {
  badge: "Plans & Pricing",
  title:
    "Affordable Gym Management Software Pricing for Every Fitness Business",
  description:
    "Flexible plans designed to simplify gym management and support your business as it grows.",
}

// TODO(content): Figma shows one yearly price and no monthly prices, so the
// switch stays on Yearly until monthly prices exist. "Monthy" is corrected.
export const billing = {
  monthly: "Monthly",
  yearly: "Yearly",
}

// TODO(content): all three cards in Figma are identical placeholders: same
// price, description and feature list, including "Up to 800 Members" and
// "100 Message Credits", which contradict the matrix below for Gold and
// Platinum. Replace with the real plans before launch.
const placeholderFeatures: PlanFeature[] = [
  { label: "Complete Member Management", included: true },
  { label: "Financial Management & Reports", included: true },
  { label: "Automated Membership Reminders", included: true },
  { label: "Smart Gym Access Control", included: true },
  { label: "Up to 800 Members", included: true },
  { label: "100 Message Credits", included: true },
  { label: "Smart Inventory Management", included: false },
  { label: "Integrated POS Billing", included: false },
  { label: "Dedicated Mobile App", included: false },
  { label: "Bulk Message Broadcasting", included: false },
  { label: "Integrated Café Management", included: false },
]

const placeholderPlan = {
  price: "Rs 14,999",
  period: "/per year",
  description:
    "A perfect starting plan for your gyms for managing and beneficial for your members",
  features: placeholderFeatures,
}

export const plans: Plan[] = [
  { name: "Starter", ...placeholderPlan },
  { name: "Gold", popular: true, ...placeholderPlan },
  { name: "Platinum", ...placeholderPlan },
]

export const planCta = {
  label: "Get Started Now",
  href: SITE.contact.whatsappUrl,
}

export const customPlan = {
  title: "Need a custom plan?",
  description:
    "Looking for something more flexible? Get a tailored Gym Udaan plan designed around your gym’s unique needs and business goals.",
  cta: { label: "Contact Our Team", href: SITE.contact.whatsappUrl },
}

export const trustedTitle = "Trusted by more than 100 companies"

export const matrixLabel = "Features"

export const matrix: PlanMatrixGroup[] = [
  {
    rows: [
      {
        label: "Member Capacity",
        values: ["Up to 800", "Unlimited", "Unlimited"],
      },
      { label: "Message Credits", values: ["100", "500", "800"] },
    ],
  },
  {
    title: "Core Gym Management",
    rows: [
      { label: "Member Management", values: [true, true, true] },
      { label: "Finance Management", values: [true, true, true] },
      { label: "Attendance Tracking", values: [true, true, true] },
      { label: "Automated Reminders", values: [true, true, true] },
      { label: "Access Control", values: [true, true, true] },
    ],
  },
  {
    title: "Business & Operations",
    rows: [
      { label: "Inventory Management", values: [false, true, true] },
      { label: "POS Billing", values: [false, true, true] },
      { label: "Cafe Management", values: [false, false, true] },
      { label: "Multi-Branch Management", values: [false, false, true] },
    ],
  },
  {
    title: "Analytics & Reporting",
    rows: [
      { label: "Advanced Analytics", values: [false, true, true] },
      { label: "Member Retention Tools", values: [false, true, true] },
      { label: "Member Credit Balance View", values: [false, true, true] },
    ],
  },
  {
    title: "Communication & Engagement",
    rows: [
      { label: "Broadcast Messaging", values: [false, true, true] },
      { label: "Mobile App", values: [false, true, true] },
      { label: "Diet & Workout Plans", values: [false, true, true] },
    ],
  },
  {
    title: "Customer Support",
    rows: [
      { label: "Priority Support", values: [true, true, true] },
      { label: "Chat Support", values: [false, true, true] },
    ],
  },
]
