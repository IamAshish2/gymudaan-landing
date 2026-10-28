// Every piece of landing page copy, list and link. Sections only map over this
// data, so wiring it to a CMS later means replacing this module.
//
// Copy is taken from Figma ("Gym udaan Redesign", frame 1:6). Lines marked
// TODO(content) are placeholders — either template text in the design or
// copy the design does not contain yet — and need sign-off before launch.

import arnoldFitness from "@/public/landing/clients/arnold-fitness.png"
import basicGym from "@/public/landing/clients/basic-gym.png"
import fitnessPark from "@/public/landing/clients/fitness-park.png"
import midTownFitness from "@/public/landing/clients/mid-town-fitness.png"
import mountainFitness from "@/public/landing/clients/mountain-fitness.png"
import ramailoFitness from "@/public/landing/clients/ramailo-fitness.png"
import controlDashboard from "@/public/landing/control/dashboard.webp"
import iconAttendance from "@/public/landing/control/icon-attendance.svg"
import iconDashboard from "@/public/landing/control/icon-dashboard.svg"
import iconMembers from "@/public/landing/control/icon-members.svg"
import iconPayments from "@/public/landing/control/icon-payments.svg"
import cardioCorner from "@/public/landing/insights/cardio-corner.webp"
import dumbbells from "@/public/landing/insights/dumbbells.webp"
import profitableGym from "@/public/landing/insights/profitable-gym.webp"
import studioCalm from "@/public/landing/insights/studio-calm.webp"
import serveGyms from "@/public/landing/serve/gyms.webp"
import serveMultiBranch from "@/public/landing/serve/multi-branch.webp"
import servePersonalTraining from "@/public/landing/serve/personal-training.webp"
import serveStudios from "@/public/landing/serve/studios.webp"
import avatarAbhishek from "@/public/landing/testimonials/avatar-abhishek.webp"
import avatarAmick from "@/public/landing/testimonials/avatar-amick.webp"
import avatarAshish from "@/public/landing/testimonials/avatar-ashish.webp"
import testimonialPortrait from "@/public/landing/testimonials/portrait.webp"
import type {
  Audience,
  ClientLogo,
  ControlTab,
  Faq,
  Feature,
  FooterColumn,
  Insight,
  LinkAction,
  RichText,
  SectionIntro,
  Service,
  Stat,
  Step,
  TestimonialTile,
} from "@/lib/landing/types"
import { ROUTES } from "@/lib/routes"

// ── Navigation ─────────────────────────────────────────────────────────────

// Figma lists both "Solutions" and "Solution"; the duplicate is dropped.
// TODO(content): there is no pricing page or section yet.
export const navLinks = [
  { label: "Product", href: ROUTES.landing.features },
  { label: "Solutions", href: ROUTES.landing.audiences },
  { label: "Pricing", href: ROUTES.landing.getStarted },
  { label: "Resources", href: ROUTES.landing.insights },
]

export const navActions = {
  login: { label: "Login", href: ROUTES.auth.login },
  signUp: { label: "Sign up", href: ROUTES.auth.register },
}

// ── Hero ───────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: "#1 Gym Management System in Nepal",
  title: "The gym management platform for modern fitness businesses",
  // TODO(content): reads like a design placeholder.
  description:
    "Clear, professional, and suitable for most gym management platforms.",
  actions: [
    { label: "Get Started", href: ROUTES.auth.register, variant: "brand" },
    { label: "Sign up", href: ROUTES.auth.register, variant: "dark" },
  ] satisfies LinkAction[],
  imageAlt:
    "Gym Udaan dashboard showing total, active and inactive members, today's check-ins, a weekly revenue chart and memberships expiring soon",
}

// ── Social proof ───────────────────────────────────────────────────────────

export const clients: { title: RichText; logos: ClientLogo[] } = {
  title: [
    "We're powering the ",
    { em: "gyms" },
    " you know and trust. Imagine ",
    { muted: "what we could do for " },
    { em: "yours" },
    { muted: "." },
  ],
  logos: [
    { name: "Basic Gym", image: basicGym },
    { name: "Ramailo Fitness", image: ramailoFitness },
    { name: "Mid Town Fitness", image: midTownFitness },
    { name: "Mountain Fitness", image: mountainFitness },
    { name: "Arnold Fitness Center", image: arnoldFitness },
    { name: "Fitness Park", image: fitnessPark },
    // TODO(content): plain text in Figma, not a logo — confirm the client.
    { name: "clientMtrack" },
  ],
}

// ── Services ───────────────────────────────────────────────────────────────

const contactCta = { label: "Contact Us", href: ROUTES.landing.contact }

export const services: SectionIntro & { items: Service[] } = {
  badge: "Our Services",
  title: [
    "Services that ",
    { em: "work" },
    " alongside you, not instead of ",
    { em: "you" },
  ],
  description:
    "Things that will make your work easy as well as your customers daily life easy with us",
  items: [
    {
      title: "Member Management",
      // TODO(content): Figma has template copy ("A professional design
      // agent, native to the canvas…") here.
      description:
        "Register members, manage memberships and renewals, and keep every member profile organised in one place.",
      cta: contactCta,
    },
    {
      title: "Attendance Management",
      description:
        "Simplify daily attendance with organized check-in records and a clear view of member activity, so you always know what's happening",
      cta: contactCta,
    },
    {
      // TODO(content): Figma shows two cards; these two are proposed.
      title: "Payments & Billing",
      description:
        "Record payments, track dues and send reminders so every membership stays paid up and accounted for.",
      cta: contactCta,
    },
    {
      title: "Reports & Insights",
      description:
        "See revenue, renewals and attendance trends at a glance and make decisions with real numbers.",
      cta: contactCta,
    },
  ],
}

// ── Main features ──────────────────────────────────────────────────────────

export const features: SectionIntro & {
  items: Feature[]
  imageAlt: string
} = {
  badge: "Main Features",
  title: [
    "More than ",
    { em: "management" },
    ". Built to take your ",
    { em: "gym" },
    " further.",
  ],
  // TODO(content): identical to the services description in Figma.
  description:
    "Things that will make your work easy as well as your customers daily life easy with us",
  items: [
    {
      title: "Gym Udaan App",
      description:
        "Manage your fitness business on the go with a dedicated mobile experience that keeps everything connected.",
    },
    // TODO(content): Figma only has a description for the first item.
    {
      title: "Multi-Social Platform",
      description:
        "Share updates, offers and classes with your members across the channels they already use.",
    },
    {
      title: "Smart Notifications",
      description:
        "Automatic reminders for renewals, dues and check-ins, so members hear from you at the right time.",
    },
    {
      title: "Member Engagement",
      description:
        "Workouts, nutrition plans and articles that keep members coming back between visits.",
    },
    {
      title: "Personalized Gym Website",
      description:
        "A website for your gym with your brand, plans and contact details, ready for new members.",
    },
  ],
  imageAlt:
    "Gym Udaan mobile app showing popular workouts, nutrition plans and fitness articles, with cards for training schedules, active members and membership renewals",
}

// ── Who we serve ───────────────────────────────────────────────────────────

export const audiences: SectionIntro & { items: Audience[] } = {
  badge: "Who we serve",
  title: ["Built for every kind of ", { em: "fitness" }, " business."],
  description:
    "From independent gyms to growing fitness brands, Gym Udaan makes managing your fitness business simpler.",
  items: [
    {
      title: "Gyms & Fitness Centers",
      description:
        "Simplify daily operations and keep your fitness center running smoothly.",
      image: serveGyms,
    },
    {
      title: "Fitness Studios",
      description:
        "Manage your members and create a more organized studio experience.",
      image: serveStudios,
    },
    {
      title: "Personal Training Studios",
      description:
        "Spend less time on administration and more time with your clients.",
      image: servePersonalTraining,
    },
    {
      title: "Multi-Branch Fitness Brands",
      description:
        "Bring structure and consistency to your growing fitness business.",
      image: serveMultiBranch,
    },
  ],
}

// ── Everything under your control ──────────────────────────────────────────

const dashboardShot = {
  src: controlDashboard,
  alt: "Gym Udaan dashboard overview with member totals, financial overview, attention items, expiring memberships, new members and recent payments",
}

export const control: SectionIntro & { tabs: ControlTab[] } = {
  title: ["Everything is kept under your ", { em: "control" }],
  description:
    "Manage memberships, track attendance, monitor payments, and stay on top of your gym's daily operations",
  // TODO(content): Figma has one screenshot; the other three tabs reuse it
  // until per-tab screenshots are supplied.
  tabs: [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: iconDashboard,
      image: dashboardShot,
    },
    {
      id: "members",
      label: "Manage Members",
      icon: iconMembers,
      image: dashboardShot,
    },
    {
      id: "attendance",
      label: "Attendance Tracking",
      icon: iconAttendance,
      image: dashboardShot,
    },
    {
      id: "payments",
      label: "Payments & Reports",
      icon: iconPayments,
      image: dashboardShot,
    },
  ],
}

// ── Stats ──────────────────────────────────────────────────────────────────

// TODO(content): confirm these are approved marketing figures.
export const stats: { title: RichText; items: Stat[] } = {
  title: ["The backbone for the ", { em: "Nepali Gym" }],
  items: [
    { value: "50+", label: "Fitness businesses growing together" },
    { value: "10K+", label: "Gym members managed effortlessly" },
    { value: "+40%", label: "Increase in your gym revenue" },
    { value: "24/7", label: "Access your gym anytime" },
  ],
}

// ── How we work ────────────────────────────────────────────────────────────

export const howItWorks: SectionIntro & { steps: Step[] } = {
  badge: "How we work",
  title: [
    "From getting started to ",
    { em: "running" },
    " your ",
    { em: "gym." },
    " It's that simple.",
  ],
  steps: [
    {
      title: "Set up your gym",
      description:
        "Create your gym workspace and configure the essentials to get started.",
    },
    {
      title: "Add Your Members",
      description:
        "Register members, organize their details, and manage memberships from one place.",
    },
    {
      title: "Manage Daily Operations",
      description:
        "Track attendance, monitor payments, and keep your gym running smoothly.",
    },
    {
      title: "Track, Improve & Grow",
      description:
        "Understand your gym's performance through reports and make smarter business decisions.",
    },
  ],
}

// ── Testimonials ───────────────────────────────────────────────────────────

// Spelling fixed from Figma: "every thing", "stay organize", "Udaan Fintess".
export const testimonials: SectionIntro & { tiles: TestimonialTile[] } = {
  badge: "Testimonial",
  title: ["Real ", { em: "gyms" }, ". Real ", { em: "experiences." }],
  description:
    "Discover how Gym Udaan helps fitness businesses simplify operations and focus on what matters most.",
  tiles: [
    {
      kind: "quote",
      quote:
        "Managing the members, tracking attendance, and keeping up with payment used to take so much of our time. Gym Udaan brings everything together and makes our daily operations much easier.",
      name: "Amick Khadka",
      role: "Khadka Fitness CEO",
      avatar: avatarAmick,
    },
    {
      kind: "photo",
      image: testimonialPortrait,
      alt: "Portrait of a Gym Udaan customer",
    },
    {
      kind: "quote",
      quote:
        "What we appreciate most is how simple everything feels. From managing memberships to checking daily activity, we can stay organized without unnecessary complication.",
      name: "Ashish Karki",
      role: "Karki Fitness",
      avatar: avatarAshish,
    },
    {
      kind: "quote",
      quote:
        "Gym Udaan gives us a clearer picture of what's happening in our gym. Having member information, attendance, and payments in one place makes a real difference.",
      name: "Abhishek Koirala",
      role: "Udaan Fitness",
      avatar: avatarAbhishek,
    },
  ],
}

// ── Insights ───────────────────────────────────────────────────────────────

// TODO(content): only the first article exists in Figma. The other titles
// are proposed and every href points at the section until a blog exists.
export const insights: SectionIntro & { items: Insight[] } = {
  badge: "Insights",
  title: ["Insights to Grow Your Fitness Business."],
  description:
    "Explore ideas, stories, and insights to help your fitness business grow.",
  items: [
    {
      title: "How to Run a More Profitable Gym in 2026",
      excerpt:
        "Explore practical ways to improve operations, manage costs, and build a stronger fitness business.",
      href: ROUTES.landing.insights,
      image: profitableGym,
    },
    {
      title: "Keeping Members Through Their First 90 Days",
      excerpt:
        "Simple check-ins and reminders that turn new sign-ups into regulars.",
      href: ROUTES.landing.insights,
      image: dumbbells,
    },
    {
      title: "Designing a Gym Floor Members Love",
      excerpt:
        "Layout, lighting and small details that make a space feel premium.",
      href: ROUTES.landing.insights,
      image: studioCalm,
    },
    {
      title: "Pricing Memberships for a Growing Gym",
      excerpt:
        "How to structure plans, add-ons and renewals without leaving money on the table.",
      href: ROUTES.landing.insights,
      image: cardioCorner,
    },
  ],
}

// ── Final CTA ──────────────────────────────────────────────────────────────

export const finalCta = {
  title: "Your gym needs a smarter way to grow",
  description:
    "Simplify daily operations, manage your members effortlessly, and focus on building a stronger fitness business with Gym Udaan",
  actions: [
    { label: "Get Started", href: ROUTES.auth.register, variant: "brand" },
    { label: "Request a demo", href: ROUTES.landing.contact, variant: "dark" },
  ] satisfies LinkAction[],
}

// ── FAQ ────────────────────────────────────────────────────────────────────

export const faq: SectionIntro & { items: Faq[]; defaultOpen: number } = {
  badge: "FAQ",
  title: ["Frequently Asked ", { em: "Questions" }],
  description:
    "Find answers to common questions about Gym Udaan and how it can simplify your gym management.",
  // Figma shows the second question open.
  defaultOpen: 1,
  // TODO(content): Figma only has the answer for "Who can use Gym Udaan?".
  items: [
    {
      question: "What is Gym Udaan?",
      answer:
        "Gym Udaan is a gym management platform that brings members, memberships, attendance, payments and reports together in one place.",
    },
    {
      question: "Who can use Gym Udaan?",
      answer:
        "Gym Udaan is designed for gym owners and fitness businesses looking to simplify their everyday management tasks.",
    },
    {
      question: "Can I manage memberships and payments?",
      answer:
        "Yes. Create membership plans, record payments, track dues and see which memberships are about to expire.",
    },
    {
      question: "Can I track member attendance?",
      answer:
        "Yes. Every check-in is recorded, so you can see daily activity and each member's attendance history.",
    },
    {
      question: "How do I get started?",
      answer:
        "Sign up, set up your gym workspace and add your members. You can be running in a single afternoon.",
    },
  ],
}

// ── Footer ─────────────────────────────────────────────────────────────────

// TODO(content): the Figma footer reads like a template (Changelog, Migrate,
// Broadcasts…). Hrefs point at the nearest landing section until real pages
// exist.
export const footerColumns: FooterColumn[] = [
  {
    title: "Features",
    links: [
      { label: "Automations", href: ROUTES.landing.features },
      { label: "Audiences", href: ROUTES.landing.audiences },
      { label: "Broadcasts", href: ROUTES.landing.features },
      { label: "Inbound", href: ROUTES.landing.services },
      { label: "Pricing", href: ROUTES.landing.getStarted },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Changelog", href: ROUTES.landing.insights },
      { label: "Enterprise", href: ROUTES.landing.audiences },
      { label: "Security", href: ROUTES.landing.faq },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: ROUTES.landing.howItWorks },
      { label: "Blog", href: ROUTES.landing.insights },
      { label: "Careers", href: ROUTES.landing.contact },
      { label: "Customers", href: ROUTES.landing.testimonials },
      { label: "Philosophy", href: ROUTES.landing.howItWorks },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Support", href: ROUTES.landing.contact },
      { label: "Status", href: ROUTES.landing.contact },
      { label: "Migrate", href: ROUTES.landing.getStarted },
      { label: "Knowledge base", href: ROUTES.landing.faq },
      { label: "Legal policies", href: ROUTES.landing.contact },
    ],
  },
]

export const footer = {
  status: "All systems operational",
  closing: "Made for the fitness businesses of tomorrow.",
  watermark: "Udaan",
}
