// Copy for /about. Every claim here is already stated elsewhere on the site
// (homepage sections, /plans, lib/site.ts) or on the live www.gymudaan.com.
// No founding year, team size, customer counts or ratings: none are confirmed.
//
// TODO(content): owner sign-off on the whole page before it is linked from the
// nav/footer or listed in the sitemap.

import type { RichText, SectionIntro } from "@/lib/landing/types"
import { ROUTES } from "@/lib/routes"
import { SITE } from "@/lib/site"

export const aboutIntro = {
  badge: "About Us",
  title: "Gym management software, built in Nepal for Nepali gyms",
  description: `${SITE.name} helps gyms and fitness centers in Nepal run members, memberships, attendance, payments and reports from one platform.`,
}

export const aboutStory: SectionIntro & { paragraphs: string[] } = {
  badge: "Who we are",
  title: [
    "Made in ",
    { em: "Itahari" },
    ", for the gyms that keep Nepal ",
    { em: "moving" },
    ".",
  ],
  description:
    "One system for the daily work of running a gym, from the front desk to the end-of-day books.",
  paragraphs: [
    `${SITE.name} is a gym management platform built by ${SITE.operator.name}, a software company based in ${SITE.contact.location}. It replaces paper registers, spreadsheets and scattered apps with one place to run a fitness business.`,
    "Gym owners use it to register members, sell and renew memberships, record check-ins, collect payments and see how the business is doing, on a desktop, a tablet or a phone.",
    "Plans are priced in Nepali rupees, and our team answers on WhatsApp and by phone, so getting your gym set up is a conversation with people who know how gyms here work.",
  ],
}

type Capability = { title: string; description: string }

export const aboutCapabilities: SectionIntro & {
  items: Capability[]
  cta: { label: string; href: string }
} = {
  badge: "What we do",
  title: ["Everything a ", { em: "gym" }, " runs on, in one platform."],
  description:
    "The tools gym owners in Nepal use every day, connected so nothing has to be entered twice.",
  items: [
    {
      title: "Membership management",
      description:
        "Register members, create membership plans and track renewals, with every member profile in one place.",
    },
    {
      title: "Attendance tracking",
      description:
        "Record every check-in and see daily activity and each member's attendance history.",
    },
    {
      title: "Payments and daybook",
      description:
        "Record payments, track dues and close each day with a clear daybook of sales, expenses and income.",
    },
    {
      title: "Reports",
      description:
        "See revenue, renewals and attendance trends at a glance and decide with real numbers.",
    },
    {
      title: "Access control",
      description:
        "Control who enters your gym. Access control is included in every plan.",
    },
    {
      title: "Member messaging",
      description:
        "Share offers and updates through bulk messages and automated renewal reminders.",
    },
    {
      title: "Social media automation",
      description:
        "Schedule posts to your Facebook, Instagram and TikTok accounts and reply to messages in one place.",
    },
    {
      title: "Gym Udaan app",
      description:
        "Manage your fitness business on the go with a dedicated mobile experience that keeps everything connected.",
    },
  ],
  cta: { label: "See plans and pricing", href: ROUTES.pricing },
}

type Principle = { title: string; description: string }

export const aboutPrinciples: SectionIntro & { items: Principle[] } = {
  badge: "How we build",
  title: ["What we ", { em: "believe" }, " gym software should be."],
  description: "The ideas behind every feature we add to Gym Udaan.",
  items: [
    {
      title: "Made for how gyms in Nepal work",
      description:
        "Prices in NPR, a local team you can call, and workflows shaped around the way gyms here sell and renew memberships.",
    },
    {
      title: "One platform, not five",
      description:
        "Members, payments, attendance and reports share the same data, so the numbers always agree.",
    },
    {
      title: "On every screen",
      description:
        "The full system on a desktop, flexible management on a tablet and quick checks from your phone.",
    },
    {
      title: "People you can reach",
      description:
        "Questions go to our team in Itahari over WhatsApp or phone, not to a ticket queue.",
    },
  ],
}

export const aboutTrustedTitle: RichText = [
  "Trusted by ",
  { em: "gyms" },
  " across Nepal",
]

type CompanyFact = { label: string; value: string; href?: string }

export const aboutCompany: SectionIntro & { facts: CompanyFact[] } = {
  badge: "Company details",
  title: ["Get in ", { em: "touch" }, " with the team."],
  description:
    "Talk to us about setting up your gym, a demo, or a plan that fits your business.",
  facts: [
    { label: "Product", value: SITE.name },
    {
      label: "Company",
      value: SITE.operator.name,
      href: SITE.operator.url,
    },
    { label: "Location", value: SITE.contact.location },
    {
      label: "Phone and WhatsApp",
      value: SITE.contact.phone,
      href: SITE.contact.whatsappUrl,
    },
    {
      label: "Email",
      value: SITE.contact.email,
      href: `mailto:${SITE.contact.email}`,
    },
  ],
}

export const aboutSocials = [
  { label: "Facebook", href: SITE.socials.facebook },
  { label: "Instagram", href: SITE.socials.instagram },
  { label: "TikTok", href: SITE.socials.tiktok },
] as const
