// Nepal-focused guides (docs/seo/10 §4, priority P1). DRAFTS: unpublished in
// lib/blog/registry.ts, so production builds return 404 for them and leave
// them out of the sitemap; staging/preview builds show them (noindex) for
// review.
//
// Before publishing each one:
// - set a real author and publication date (articles.ts refuses to publish an
//   article whose date is not a real date);
// - re-check every legal/tax statement against the official source named in
//   the article (rules and thresholds change with each Finance Act);
// - confirm any product statement still matches the live plans.
// Product facts used here are only those on the live /plans page (2026-11-04).

import type { BlogArticle } from "@/lib/blog/types"
import { ROUTES } from "@/lib/routes"
import checklist from "@/public/landing/blog/checklist.webp"
import dashboardLaptop from "@/public/landing/blog/dashboard-laptop.webp"
import revenueCoins from "@/public/landing/blog/revenue-coins.webp"

const draftByline = {
  // TODO(content): real author name before publishing.
  author: "Gym Udaan Team",
  date: "Draft (unpublished)",
}

export const chooseGymSoftwareGuide: BlogArticle = {
  post: {
    id: "choose-gym-management-software-nepal",
    href: ROUTES.blogPost("choose-gym-management-software-nepal"),
    title: "How to Choose Gym Management Software in Nepal",
    category: "Software",
    ...draftByline,
    excerpt:
      "A practical checklist for gym owners in Nepal: what gym software should handle, the local needs to check, and the questions to ask before you pay.",
    image: { src: dashboardLaptop },
  },
  related: ["gym-software-price-nepal", "how-to-open-a-gym-in-nepal"],
  sections: [
    {
      id: "introduction",
      label: "Introduction",
      title: "Why the choice matters more than the brand",
      blocks: [
        {
          kind: "text",
          text: "Most gyms in Nepal start with a register, a WhatsApp group and an Excel sheet. That works for the first few dozen members. Past that, renewals slip, dues go uncollected and nobody can say for sure how many members are actually active. Gym management software fixes this only if it fits the way your gym really works, so it is worth choosing on fit rather than on a feature list.",
        },
        {
          kind: "text",
          text: "This guide walks through what the software should do, what matters specifically for gyms in Nepal, and the questions to ask any vendor before you commit.",
        },
      ],
    },
    {
      id: "core-jobs",
      label: "What it should do",
      title: "The four jobs gym software must do well",
      blocks: [
        {
          kind: "list",
          items: [
            "Members and memberships: a profile for every member, their plan, start and end dates, and an automatic reminder before the plan expires.",
            "Attendance and entry: a record of every visit, whether by card, fingerprint, QR code or door access control, so you can see who is coming and who has stopped.",
            "Payments and dues: what each member paid, what is still owed, and a daily total that matches the cash and digital payments you actually received.",
            "Reports: revenue, renewals, new and expiring members and attendance over time, so decisions rest on numbers instead of impressions.",
          ],
        },
        {
          kind: "text",
          text: "If a system is weak at any of these four, the extras (cafe billing, diet plans, social media tools) won't make up for it.",
        },
      ],
    },
    {
      id: "nepal-needs",
      label: "Nepal-specific needs",
      title: "What to check for a gym in Nepal",
      blocks: [
        {
          kind: "text",
          text: "Software built for other markets often trips over everyday details here. Ask about each of these directly:",
        },
        {
          kind: "list",
          items: [
            "Nepali dates: can members, bills and reports show Bikram Sambat (BS) dates as well as AD? Your members and staff think in BS.",
            "Local payments: does it record the ways your members really pay, such as cash, bank transfer and digital wallets?",
            "SMS reminders: are reminders sent by SMS to Nepali numbers, and how many messages are included before you pay extra?",
            "Billing and tax: if you are registered for PAN or VAT, can the bills it produces meet the Inland Revenue Department's requirements for your business? Ask the vendor, and confirm with your tax office.",
            "Support: is help available in Nepali, at the hours your gym is open?",
          ],
        },
      ],
    },
    {
      id: "questions",
      label: "Questions to ask",
      title: "Questions to ask before you pay",
      blocks: [
        {
          kind: "list",
          items: [
            "What exactly does each plan include, and what is the member limit?",
            "Is the price per year or per month, and what happens to the price at renewal?",
            "Do I need extra hardware (a fingerprint device, cards or a door controller) and who supplies it?",
            "Can I run more than one branch, and does that cost extra?",
            "Can staff have their own logins with limited access?",
            "Will you help move my existing members from my register or Excel?",
            "Can I export my data if I leave?",
            "Is there a mobile app for me, and one for my members?",
          ],
        },
        {
          kind: "callout",
          title: "Ask for a live demo with your own data",
          text: "Give the vendor five of your real members, with their real plans and payment situations, and ask them to show the renewal and payment flow. Ten minutes of this tells you more than any brochure.",
        },
      ],
    },
    {
      id: "register-vs-software",
      label: "Register vs software",
      title: "When it is time to move off the register",
      blocks: [
        {
          kind: "text",
          text: "A register is free and familiar, but it can't remind anyone, add anything up or warn you that a member has stopped coming. The usual signs it is time to switch: you are chasing renewals by memory, the day's cash never quite matches the book, and you can't answer “how many active members do we have?” without counting.",
        },
      ],
    },
    {
      id: "gym-udaan",
      label: "Where Gym Udaan fits",
      title: "Where Gym Udaan fits",
      blocks: [
        {
          kind: "text",
          text: "Gym Udaan is gym management software made for gyms in Nepal. Every plan covers member management, finance, attendance, automatic reminders and access control, with annual plans from NPR 14,999. Compare what each plan includes on the plans page, or message us on WhatsApp for a demo with your own members.",
        },
      ],
    },
  ],
}

export const gymSoftwarePriceGuide: BlogArticle = {
  post: {
    id: "gym-software-price-nepal",
    href: ROUTES.blogPost("gym-software-price-nepal"),
    title: "Gym Software Price in Nepal: What Affects the Cost",
    category: "Software",
    ...draftByline,
    excerpt:
      "How gym management software is priced in Nepal, what changes the price, the hidden costs to ask about, and what Gym Udaan's NPR plans include.",
    image: { src: revenueCoins },
  },
  related: [
    "choose-gym-management-software-nepal",
    "how-to-open-a-gym-in-nepal",
  ],
  sections: [
    {
      id: "introduction",
      label: "Introduction",
      title: "Why prices are hard to compare",
      blocks: [
        {
          kind: "text",
          text: "Ask three vendors what their gym software costs and you may get three answers that can't be lined up side by side: one charges per year, one per member, one quotes only after a call. This guide explains the usual pricing models, what pushes the price up, and the costs that often appear only after you have signed up.",
        },
      ],
    },
    {
      id: "models",
      label: "Pricing models",
      title: "The common pricing models",
      blocks: [
        {
          kind: "list",
          items: [
            "Annual plans: one price per year for a set of features and a member limit. Easy to budget; check what the next year costs.",
            "Monthly subscriptions: lower to start, but add up over a year; check whether there is a discount for paying annually.",
            "Per member or per branch: the price grows with your gym, which is fair, but make sure you know the price at the size you expect to reach.",
            "One-time licence: you pay once, but updates, support and hosting may be extra.",
          ],
        },
      ],
    },
    {
      id: "what-changes-price",
      label: "What changes the price",
      title: "What changes the price",
      blocks: [
        {
          kind: "list",
          items: [
            "Member limit: entry plans often cap the number of members.",
            "Branches: multi-branch management is usually in the top plan only.",
            "Extra modules: inventory, point-of-sale billing, cafe management, a member app and advanced analytics are often reserved for higher plans.",
            "SMS: reminder and broadcast messages are often limited by a number of message credits per plan.",
            "Hardware: fingerprint devices, cards or door access controllers are usually bought separately.",
          ],
        },
      ],
    },
    {
      id: "hidden-costs",
      label: "Hidden costs",
      title: "Costs to ask about before you sign",
      blocks: [
        {
          kind: "list",
          items: [
            "Setup or onboarding fees, and whether moving your existing members is included.",
            "Price increases at renewal.",
            "Extra SMS credits once the included messages run out.",
            "Hardware, installation and replacement.",
            "Training for new staff, and support outside office hours.",
          ],
        },
        {
          kind: "callout",
          title: "Compare the total for one year",
          text: "Add the plan price, the hardware you need, expected extra SMS and any setup fee. That single yearly total is the number to compare between vendors.",
        },
      ],
    },
    {
      id: "gym-udaan-plans",
      label: "Gym Udaan plans",
      title: "Gym Udaan plans in NPR",
      blocks: [
        {
          kind: "text",
          text: "Gym Udaan publishes its prices. All plans are billed annually:",
        },
        {
          kind: "list",
          items: [
            "Standard, NPR 14,999 a year: for small gyms getting started. Member management, finance, attendance, automatic reminders, access control and priority support, up to 800 members and 100 message credits.",
            "Gold, NPR 19,999 a year: for growing gyms. Everything in Standard plus inventory, POS billing, advanced analytics, broadcast messaging, the mobile app, member retention tools, diet and workout plans, credit balance view and chat support, with unlimited members and 500 message credits.",
            "Platinum, NPR 24,999 a year: full-scale management. Everything in Gold plus multi-branch and cafe management, with unlimited members and 800 message credits.",
          ],
        },
        {
          kind: "text",
          text: "See the full comparison on the plans page, or message us on WhatsApp if you need a custom plan.",
        },
      ],
    },
    {
      id: "value",
      label: "Working out the value",
      title: "Working out whether it pays for itself",
      blocks: [
        {
          kind: "text",
          text: "The simplest test: count the memberships that lapsed last year because nobody followed up, and the dues that were never collected. If the software would have recovered even a few of those through reminders, compare that amount with the plan price. Add the hours your front desk spends on registers and end-of-day cash counts, and you have a realistic picture.",
        },
      ],
    },
  ],
}

export const openGymNepalGuide: BlogArticle = {
  post: {
    id: "how-to-open-a-gym-in-nepal",
    href: ROUTES.blogPost("how-to-open-a-gym-in-nepal"),
    title: "How to Open a Gym in Nepal: Registration, PAN/VAT and First Steps",
    category: "Business",
    ...draftByline,
    excerpt:
      "Step by step: choosing a business structure, registering your gym in Nepal, PAN and VAT with the IRD, local requirements, staff and getting your first members.",
    image: { src: checklist },
  },
  related: ["choose-gym-management-software-nepal", "gym-software-price-nepal"],
  sections: [
    {
      id: "introduction",
      label: "Introduction",
      title: "Before you start",
      blocks: [
        {
          kind: "text",
          text: "Opening a gym in Nepal is mostly a business-registration process plus careful planning of space, equipment, staff and pricing. This guide gives the order of steps and points to the official offices for each one.",
        },
        {
          kind: "callout",
          title: "Rules change: confirm before you file",
          text: "Fees, tax thresholds and required documents are set by law and updated, often in the annual Finance Act. Use this guide as a checklist and confirm every requirement with the office named in each step, or with a licensed accountant or lawyer.",
        },
      ],
    },
    {
      id: "plan",
      label: "Plan the gym",
      title: "1. Plan the gym",
      blocks: [
        {
          kind: "list",
          items: [
            "Who it is for: general fitness, strength training, women-only, a studio for classes, or a mix.",
            "Location and space: footfall, parking, ventilation, changing rooms and floor strength for heavy equipment.",
            "Opening hours and the number of members you expect in the first year.",
            "A budget that separates one-time costs (fit-out, equipment) from monthly costs (rent, salaries, electricity, software).",
          ],
        },
      ],
    },
    {
      id: "structure",
      label: "Business structure",
      title: "2. Choose a business structure",
      blocks: [
        {
          kind: "text",
          text: "Most single-owner gyms start as a private firm (sole proprietorship). A private firm is registered under the Private Firm Registration Act, 2014 BS, with the Department of Commerce, Supplies and Consumer Protection, and the owner is personally responsible for the business's debts.",
        },
        {
          kind: "text",
          text: "If you are opening with partners or investors, or plan several branches, a private limited company may suit better. Companies are registered with the Office of the Company Registrar.",
        },
      ],
    },
    {
      id: "register",
      label: "Register the business",
      title: "3. Register the business",
      blocks: [
        {
          kind: "text",
          text: "For a private firm, applicants are typically asked for:",
        },
        {
          kind: "list",
          items: [
            "the proposed business name and its objectives (gym or fitness centre services);",
            "the business address, with the rental agreement for the premises;",
            "the owner's name, address and a copy of their citizenship certificate;",
            "the registration fee.",
          ],
        },
        {
          kind: "text",
          text: "Ask the registering office for its current document list and fee before you go: requirements differ between offices and change over time.",
        },
      ],
    },
    {
      id: "pan-vat",
      label: "PAN and VAT",
      title: "4. Get a PAN, and check whether VAT applies",
      blocks: [
        {
          kind: "text",
          text: "Every business needs a Permanent Account Number (PAN) from the Inland Revenue Department (IRD) to pay tax and issue bills. Register for your business PAN once the firm or company is registered.",
        },
        {
          kind: "text",
          text: "VAT registration becomes mandatory when your annual turnover passes the threshold set by law; for service businesses this has been reported as NPR 3 million a year for FY 2082/83, but confirm the current figure with the IRD before relying on it. You can also register voluntarily. If you are VAT-registered, your bills must meet the IRD's invoicing requirements.",
        },
      ],
    },
    {
      id: "local",
      label: "Local requirements",
      title: "5. Check local requirements",
      blocks: [
        {
          kind: "text",
          text: "Your municipality or ward office may require its own business registration and an annual renewal, and may set local business taxes. Visit the ward office for your premises, ask what applies to a gym or fitness centre, and keep the receipts with your registration papers.",
        },
      ],
    },
    {
      id: "staff",
      label: "Staff",
      title: "6. Hire staff the right way",
      blocks: [
        {
          kind: "text",
          text: "Give every trainer and front-desk employee a written contract, and register as an employer for staff benefits as required under Nepal's labour and social security laws. Ask your accountant what your obligations are before the first salary is paid, including tax deducted from salaries.",
        },
      ],
    },
    {
      id: "pricing",
      label: "Pricing memberships",
      title: "7. Price your memberships",
      blocks: [
        {
          kind: "list",
          items: [
            "Offer a few clear plans (for example monthly, quarterly and yearly) rather than many.",
            "Decide on an admission fee and on what personal training costs on top.",
            "Check what gyms nearby charge, and price on what you offer, not only on what others charge.",
            "Write down your rules on freezing, transfers and refunds before the first member asks.",
          ],
        },
      ],
    },
    {
      id: "day-one",
      label: "Run it from day one",
      title: "8. Set up your systems on day one",
      blocks: [
        {
          kind: "text",
          text: "It is far easier to start with a proper system than to move hundreds of members off a register later. From the first member, record each member's plan and dates, every check-in and every payment, and send a reminder before each plan expires.",
        },
        {
          kind: "text",
          text: "Gym Udaan does this for gyms in Nepal: member management, attendance, finance, automatic reminders and access control are in every plan, from NPR 14,999 a year.",
        },
      ],
    },
    {
      id: "sources",
      label: "Official sources",
      title: "Official offices to confirm with",
      blocks: [
        {
          kind: "list",
          items: [
            "Department of Commerce, Supplies and Consumer Protection: private firm registration (Private Firm Registration Act, 2014 BS).",
            "Office of the Company Registrar: company registration.",
            "Inland Revenue Department (ird.gov.np): PAN, VAT registration and invoicing rules.",
            "Your municipality and ward office: local business registration, renewal and local taxes.",
          ],
        },
      ],
    },
  ],
}

/** The guides, in the order they are planned (docs/seo/10 §4.2). */
export const guides: BlogArticle[] = [
  openGymNepalGuide,
  chooseGymSoftwareGuide,
  gymSoftwarePriceGuide,
]
