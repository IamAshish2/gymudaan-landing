// Pricing page copy, plans and comparison matrix (Figma frame 1:721).

import type { Plan, PlanFeature, PlanMatrixGroup } from "@/lib/pricing/types"
import { ROUTES } from "@/lib/routes"
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

// The live plans at https://www.gymudaan.com/plans (checked 2026-11-04): the
// same names, annual prices, limits and feature split, shown in NPR instead
// of "Rs". The comparison matrix below agrees row for row. The pricing
// calculator and the /plans Offer JSON-LD read these cards, so change prices
// here only.
const PERIOD = "/year, billed annually"

// Every plan's features in one order; each plan says which it includes.
const feature = (label: string, included: boolean): PlanFeature => ({
  label,
  included,
})

export const plans: Plan[] = [
  {
    name: "Standard",
    price: "NPR 14,999",
    period: PERIOD,
    description: "For small gyms getting started",
    features: [
      feature("Member Management", true),
      feature("Finance", true),
      feature("Attendance", true),
      feature("Auto Reminder", true),
      feature("Access Control", true),
      feature("Priority Support", true),
      feature("Members: Up to 800", true),
      feature("Message Credits: 100", true),
      feature("Inventory Management", false),
      feature("POS Billing", false),
      feature("Advanced Analytics", false),
      feature("Broadcast Messaging", false),
      feature("Mobile App", false),
      feature("Member Retention", false),
      feature("Diet & Workout Plans", false),
      feature("Credit Balance View", false),
      feature("Chat Support", false),
      feature("Multi Branch", false),
      feature("Cafe Management", false),
    ],
  },
  {
    name: "Gold",
    popular: true,
    price: "NPR 19,999",
    period: PERIOD,
    description: "Ideal for growing gym branches",
    features: [
      feature("Member Management", true),
      feature("Finance", true),
      feature("Attendance", true),
      feature("Auto Reminder", true),
      feature("Inventory Management", true),
      feature("POS Billing", true),
      feature("Advanced Analytics", true),
      feature("Broadcast Messaging", true),
      feature("Access Control", true),
      feature("Mobile App", true),
      feature("Member Retention", true),
      feature("Diet & Workout Plans", true),
      feature("Credit Balance View", true),
      feature("Chat Support", true),
      feature("Priority Support", true),
      feature("Members: Unlimited", true),
      feature("Message Credits: 500", true),
      feature("Multi Branch", false),
      feature("Cafe Management", false),
    ],
  },
  {
    name: "Platinum",
    price: "NPR 24,999",
    period: PERIOD,
    description: "Full-scale multi-branch management",
    features: [
      feature("Member Management", true),
      feature("Finance", true),
      feature("Attendance", true),
      feature("Auto Reminder", true),
      feature("Inventory Management", true),
      feature("POS Billing", true),
      feature("Advanced Analytics", true),
      feature("Broadcast Messaging", true),
      feature("Access Control", true),
      feature("Mobile App", true),
      feature("Member Retention", true),
      feature("Diet & Workout Plans", true),
      feature("Credit Balance View", true),
      feature("Chat Support", true),
      feature("Priority Support", true),
      feature("Multi Branch", true),
      feature("Cafe Management", true),
      feature("Members: Unlimited", true),
      feature("Message Credits: 800", true),
    ],
  },
]

export const planCta = {
  label: "Get Started Now",
  href: ROUTES.onboarding,
}

// The comparison table's last column is too narrow for the full label at
// laptop widths, so its buttons use the short form.
export const matrixCtaLabel = "Get Started"

export const customPlan = {
  title: "Need a custom plan?",
  description:
    "Looking for something more flexible? Get a tailored Gym Udaan plan designed around your gym’s unique needs and business goals.",
  cta: { label: "Contact Our Team", href: SITE.contact.whatsappUrl },
}

// No customer count until one is confirmed; this describes the logo row.
// TODO(content): confirm every logo shown is a current, consenting customer.
export const trustedTitle = "Gyms across Nepal that use Gym Udaan"

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
