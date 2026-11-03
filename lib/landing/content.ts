// Every piece of landing page copy, list and link. Sections only map over this
// data, so wiring it to a CMS later means replacing this module.
//
// Copy is taken from Figma ("gym-udaan-copy", frame 1:11). Lines marked
// TODO(content) are placeholders — either template text in the design or
// copy the design does not contain yet — and need sign-off before launch.

import arnoldFitness from "@/public/landing/clients/arnold-fitness.webp"
import basicGym from "@/public/landing/clients/basic-gym.webp"
import divineGym from "@/public/landing/clients/divine-gym.webp"
import fitnessPark from "@/public/landing/clients/fitness-park.webp"
import freestyleFitness from "@/public/landing/clients/freestyle-fitness.webp"
import jnlFitness from "@/public/landing/clients/jnl-fitness.webp"
import matadorFitness from "@/public/landing/clients/matador-fitness.webp"
import midTownFitness from "@/public/landing/clients/mid-town-fitness.webp"
import mountainFitness from "@/public/landing/clients/mountain-fitness.webp"
import nutrihub from "@/public/landing/clients/nutrihub.webp"
import oasisFitness from "@/public/landing/clients/oasis-fitness.webp"
import ramailoFitness from "@/public/landing/clients/ramailo-fitness.webp"
import richardsFitness from "@/public/landing/clients/richards-fitness.webp"
import sajiloFitness from "@/public/landing/clients/sajilo-fitness.webp"
import universeFitness from "@/public/landing/clients/universe-fitness.webp"
import compareAttendance from "@/public/landing/comparison/icon-attendance.svg"
import compareBranches from "@/public/landing/comparison/icon-branches.svg"
import compareCommunication from "@/public/landing/comparison/icon-communication.svg"
import compareDashboard from "@/public/landing/comparison/icon-dashboard.svg"
import compareInventory from "@/public/landing/comparison/icon-inventory.svg"
import compareMemberApp from "@/public/landing/comparison/icon-member-app.svg"
import compareMembers from "@/public/landing/comparison/icon-members.svg"
import compareMobileAccess from "@/public/landing/comparison/icon-mobile-access.svg"
import comparePayments from "@/public/landing/comparison/icon-payments.svg"
import comparePayroll from "@/public/landing/comparison/icon-payroll.svg"
import compareRenewals from "@/public/landing/comparison/icon-renewals.svg"
import compareReports from "@/public/landing/comparison/icon-reports.svg"
import compareSecurity from "@/public/landing/comparison/icon-security.svg"
import compareSms from "@/public/landing/comparison/icon-sms.svg"
import compareTrainer from "@/public/landing/comparison/icon-trainer.svg"
import controlAttendance from "@/public/landing/control/attendance.webp"
import controlDashboard from "@/public/landing/control/dashboard.webp"
import controlMembers from "@/public/landing/control/members.webp"
import controlPayments from "@/public/landing/control/payments.webp"
import iconAttendance from "@/public/landing/control/icon-attendance.svg"
import iconDashboard from "@/public/landing/control/icon-dashboard.svg"
import iconMembers from "@/public/landing/control/icon-members.svg"
import iconPayments from "@/public/landing/control/icon-payments.svg"
import iconDesktop from "@/public/landing/everywhere/icon-desktop.svg"
import iconMobile from "@/public/landing/everywhere/icon-mobile.svg"
import iconTablet from "@/public/landing/everywhere/icon-tablet.svg"
import featureAppMockup from "@/public/landing/features/app-mockup.webp"
import featureDailyDaybook from "@/public/landing/features/daily-daybook.webp"
import featureMarketingTools from "@/public/landing/features/marketing-tools.webp"
import featureReporting from "@/public/landing/features/reporting.webp"
import featureSocialMedia from "@/public/landing/features/social-media.webp"
import battleRopes from "@/public/landing/insights/battle-ropes.webp"
import coach from "@/public/landing/insights/coach.webp"
import profitableGym from "@/public/landing/insights/profitable-gym.webp"
import trainingFloor from "@/public/landing/insights/training-floor.webp"
import serveBootcamp from "@/public/landing/serve/bootcamp.webp"
import serveCalisthenics from "@/public/landing/serve/calisthenics.webp"
import serveDance from "@/public/landing/serve/dance.webp"
import serveGymnastics from "@/public/landing/serve/gymnastics.webp"
import serveGyms from "@/public/landing/serve/gyms.webp"
import serveMultiBranch from "@/public/landing/serve/multi-branch.webp"
import servePersonalTraining from "@/public/landing/serve/personal-training.webp"
import serveStudios from "@/public/landing/serve/studios.webp"
import serveSumoWrestling from "@/public/landing/serve/sumo-wrestling.webp"
import serveYogaPilates from "@/public/landing/serve/yoga-pilates.webp"
import avatarAbhishek from "@/public/landing/testimonials/avatar-abhishek.webp"
import avatarAmick from "@/public/landing/testimonials/avatar-amick.webp"
import avatarAshish from "@/public/landing/testimonials/avatar-ashish.webp"
import testimonialVideoPoster from "@/public/landing/testimonials/video-1-poster.webp"
import type {
  Audience,
  ClientLogo,
  ComparisonRow,
  ControlTab,
  DeviceTier,
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
import { SITE } from "@/lib/site"

// ── Navigation ─────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "Home", href: ROUTES.home },
  { label: "Testimonial", href: ROUTES.landing.testimonials },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Blogs", href: ROUTES.blogs },
]

export const navActions = {
  contact: { label: "Contact Us", href: SITE.contact.whatsappUrl },
  login: { label: "Login", href: SITE.loginUrl },
}

// ── Hero ───────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: "GymUdaan Nepal's #1 Gym Software",
  title: "The gym management platform for modern fitness businesses",
  // Below sm the full title runs to three lines at the display size; this
  // one fits on two.
  titleShort: "The all-in-one gym management platform",
  description: "Run memberships, attendance and payments from one platform.",
  actions: [
    { label: "Get Started", href: ROUTES.onboarding, variant: "brand" },
    {
      label: "Request a demo",
      href: SITE.contact.whatsappUrl,
      variant: "dark",
      desktopOnly: true,
    },
  ] satisfies LinkAction[],
  video: {
    src: "/video/gym-udaan-final.mp4",
    // TODO(content): describe what the video shows once it is final.
    label: "Gym Udaan product video",
  },
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
  // From GymFrontend/src/assets/client-logos, with the names that site uses.
  logos: [
    { name: "Universe Fitness Studio", image: universeFitness },
    { name: "NutriHub", image: nutrihub },
    { name: "Oasis Gym", image: oasisFitness },
    { name: "Sajilo Gym", image: sajiloFitness },
    { name: "Matador Gym", image: matadorFitness },
    { name: "Freestyle Gym", image: freestyleFitness },
    { name: "Richard Fitness", image: richardsFitness },
    { name: "Divine Fitness", image: divineGym },
    { name: "JNL Gym", image: jnlFitness },
    { name: "Basic Gym", image: basicGym },
    { name: "Ramailo Fitness", image: ramailoFitness },
    { name: "Mid Town Fitness", image: midTownFitness },
    { name: "Mountain Fitness", image: mountainFitness },
    { name: "Arnold Fitness", image: arnoldFitness },
    { name: "Fitness Park", image: fitnessPark },
  ],
}

// ── Services ───────────────────────────────────────────────────────────────

const contactCta = { label: "Contact Us", href: SITE.contact.whatsappUrl }

export const services: SectionIntro & { items: Service[] } = {
  badge: "Our Features",
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
      image: featureAppMockup,
      imageAlt:
        "Gym Udaan mobile app showing popular workouts, nutrition plans and fitness articles, with cards for training schedules, active members and membership renewals",
      // Figma crops the mockup from the left (node 1:167).
      imageCrop: true,
    },
    // TODO(content): Figma only has a description for the first item. The
    // others are proposed. "Reporting's" in Figma is corrected to "Reporting".
    {
      title: "Social Media Automation",
      description:
        "Schedule and publish posts to your connected Facebook, Instagram and TikTok accounts, and reply to comments and messages in one place.",
      image: featureSocialMedia,
      imageAlt:
        "Phone showing Instagram, Facebook, YouTube and TikTok toggles with a Schedule Post button, surrounded by cards for planning, content, auto publishing and performance",
    },
    {
      title: "Reporting",
      description:
        "See revenue, renewals and attendance trends at a glance and make decisions with real numbers.",
      image: featureReporting,
      imageAlt:
        "Total revenue card connected to cards for renewals, attendance, attendance rate and a revenue trend chart",
    },
    {
      title: "Daily Daybook",
      description:
        "Keep a clear record of each day's activity, so your books are ready when you close for the day.",
      image: featureDailyDaybook,
      imageAlt:
        "Daily Daybook listing total sales, expenses, memberships and other income, connected to a net total card and a bar chart",
    },
    {
      title: "Marketing Tools",
      description:
        "Share offers and updates with your members through bulk messages and automated reminders.",
      image: featureMarketingTools,
      imageAlt:
        "Phone showing a member messaging list, connected to cards for bulk messages and automated reminders",
    },
  ],
}

// ── Comparison ─────────────────────────────────────────────────────────────

// Spelling fixed from Figma: "Comparision", "gyms chooses".
export const comparison: SectionIntro & {
  featureLabel: string
  columns: {
    key: "manual" | "generic" | "udaan"
    label: string
    /** Header below lg, where each mark column is about 64px wide. */
    shortLabel: string
  }[]
  rows: ComparisonRow[]
} = {
  badge: "Comparison",
  title: ["Why modern gyms choose Gym Udaan"],
  // TODO(content): identical to the services description in Figma.
  description:
    "Things that will make your work easy as well as your customers daily life easy with us",
  featureLabel: "Features",
  columns: [
    { key: "manual", label: "Manual Management", shortLabel: "Manual" },
    { key: "generic", label: "Generic Software", shortLabel: "Generic" },
    { key: "udaan", label: "Gym Udaan", shortLabel: "Gym Udaan" },
  ],
  rows: [
    {
      label: "Member Management",
      icon: compareMembers,
      manual: "no",
      generic: "partial",
      udaan: "yes",
    },
    {
      label: "Membership Plan Renewals",
      icon: compareRenewals,
      manual: "no",
      generic: "partial",
      udaan: "yes",
    },
    {
      label: "Attendance tracking",
      icon: compareAttendance,
      manual: "no",
      generic: "partial",
      udaan: "yes",
    },
    {
      label: "Payment Tracking",
      icon: comparePayments,
      manual: "no",
      generic: "yes",
      udaan: "yes",
    },
    {
      label: "Revenue & Expense Reports",
      icon: compareReports,
      manual: "no",
      generic: "partial",
      udaan: "yes",
    },
    {
      label: "Inventory Management",
      icon: compareInventory,
      manual: "no",
      generic: "partial",
      udaan: "yes",
    },
    {
      label: "Trainer & Class Management",
      icon: compareTrainer,
      manual: "no",
      generic: "partial",
      udaan: "yes",
    },
    {
      label: "Multi Branch Management",
      icon: compareBranches,
      manual: "no",
      generic: "partial",
      udaan: "yes",
    },
    {
      label: "Member Communication",
      icon: compareCommunication,
      manual: "no",
      generic: "partial",
      udaan: "yes",
    },
    {
      label: "Mobile Access",
      icon: compareMobileAccess,
      manual: "no",
      generic: "yes",
      udaan: "yes",
    },
    {
      label: "Gym Specific Dashboard",
      icon: compareDashboard,
      manual: "no",
      generic: "partial",
      udaan: "yes",
    },
    {
      label: "Data Security & Backup",
      icon: compareSecurity,
      manual: "no",
      generic: "yes",
      udaan: "yes",
    },
    {
      label: "Member App",
      icon: compareMemberApp,
      manual: "no",
      generic: "yes",
      udaan: "yes",
    },
    {
      label: "SMS",
      icon: compareSms,
      manual: "no",
      generic: "yes",
      udaan: "yes",
    },
    {
      label: "Payroll",
      icon: comparePayroll,
      manual: "no",
      generic: "yes",
      udaan: "yes",
    },
  ],
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
    {
      title: "Sumo & Wrestling",
      description:
        "Keep memberships, training sessions, and payments in one place.",
      image: serveSumoWrestling,
    },
    {
      title: "Calisthenics",
      description:
        "Stay organized as your training community and member base grow.",
      image: serveCalisthenics,
    },
    {
      title: "Gymnastics & Acrobatics",
      description:
        "Track attendance and memberships across every class and skill level.",
      image: serveGymnastics,
    },
    {
      title: "Bootcamp Fitness",
      description:
        "Run group sessions and renewals without the paperwork piling up.",
      image: serveBootcamp,
    },
    {
      title: "Dance & Zumba Studios",
      description: "Keep classes, attendance, and payments moving in step.",
      image: serveDance,
    },
    {
      title: "Yoga & Pilates Studios",
      description:
        "Spend less time on admin and keep your studio calm and organized.",
      image: serveYogaPilates,
    },
  ],
}

// ── Everything under your control ──────────────────────────────────────────

export const control: SectionIntro & { tabs: ControlTab[] } = {
  title: ["Everything is kept under your ", { em: "control" }],
  description:
    "Manage memberships, track attendance, monitor payments, and stay on top of your gym's daily operations",
  tabs: [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: iconDashboard,
      image: {
        src: controlDashboard,
        alt: "Gym Udaan dashboard overview with member totals, financial overview, attention items, expiring memberships, new members and recent payments",
      },
    },
    {
      id: "members",
      label: "Manage Members",
      icon: iconMembers,
      image: {
        src: controlMembers,
        alt: "Gym Udaan member management screen with member totals, a member growth chart, an active member overview, quick actions and a member list",
      },
    },
    {
      id: "attendance",
      label: "Attendance Tracking",
      icon: iconAttendance,
      image: {
        src: controlAttendance,
        alt: "Gym Udaan attendance tracking screen with today's present, leave, late and absent counts, a weekly attendance chart, quick actions and a staff attendance log",
      },
    },
    {
      id: "payments",
      label: "Payments & Reports",
      icon: iconPayments,
      image: {
        src: controlPayments,
        alt: "Gym Udaan payments and reports screen with revenue totals, a monthly revenue chart, payment methods, quick reports and recent payments",
      },
    },
  ],
}

// ── Stats ──────────────────────────────────────────────────────────────────

// TODO(content): confirm these are approved marketing figures.
export const stats: { title: RichText; items: Stat[] } = {
  title: ["The backbone for the ", { em: "Nepali Gym" }],
  items: [
    { value: "100+", label: "Fitness businesses growing together" },
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

// ── Available everywhere ───────────────────────────────────────────────────

export const everywhere: SectionIntro & {
  imageAlt: string
  tiers: DeviceTier[]
} = {
  badge: "Available Everywhere",
  title: ["One Platform. Available On Every Screen."],
  description:
    "Manage your gym seamlessly across desktop, tablet, and mobile. Stay connected to your business, wherever you are.",
  imageAlt:
    "The Gym Udaan dashboard shown on a laptop, a tablet and a phone, each with member totals and a financial overview",
  tiers: [
    { title: "Desktop", caption: "Complete Control", icon: iconDesktop },
    { title: "Tablet", caption: "Flexible Management", icon: iconTablet },
    { title: "Mobile", caption: "Management on the Go", icon: iconMobile },
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
      kind: "video",
      src: "/video/testimonial-1.mp4",
      poster: testimonialVideoPoster,
      // TODO(content): name the customer once the testimonial is final.
      label: "Video testimonial from a Gym Udaan customer",
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
    // TODO(content): PLACEHOLDER. Replace with a real customer's quote, name,
    // gym and photo before launch; do not publish an invented testimonial.
    {
      kind: "quote",
      quote:
        "Renewal reminders go out on their own now, so far fewer memberships slip through the cracks. Our front desk spends its time with members instead of paperwork.",
      name: "Customer Name",
      role: "Gym Name",
    },
  ],
}

// ── Insights ───────────────────────────────────────────────────────────────

// TODO(content): only the first article exists in Figma. The other titles
// are proposed, and every href opens the blog until article pages exist.
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
      href: ROUTES.blogs,
      image: profitableGym,
    },
    {
      title: "Keeping Members Through Their First 90 Days",
      excerpt:
        "Simple check-ins and reminders that turn new sign-ups into regulars.",
      href: ROUTES.blogs,
      image: trainingFloor,
    },
    {
      title: "Designing a Gym Floor Members Love",
      excerpt:
        "Layout, lighting and small details that make a space feel premium.",
      href: ROUTES.blogs,
      image: battleRopes,
    },
    {
      title: "Pricing Memberships for a Growing Gym",
      excerpt:
        "How to structure plans, add-ons and renewals without leaving money on the table.",
      href: ROUTES.blogs,
      image: coach,
    },
  ],
}

// ── Final CTA ──────────────────────────────────────────────────────────────

export const finalCta = {
  title: "Your gym needs a smarter way to grow",
  description:
    "Simplify daily operations, manage your members effortlessly, and focus on building a stronger fitness business with Gym Udaan",
  actions: [
    { label: "Get Started", href: ROUTES.onboarding, variant: "brand" },
    { label: "Contact Us", href: SITE.contact.whatsappUrl, variant: "dark" },
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
        "Message us on WhatsApp and we'll set up your gym workspace. Then add your members and you can be running in a single afternoon.",
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
      { label: "Pricing", href: ROUTES.pricing },
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
      { label: "Blog", href: ROUTES.blogs },
      { label: "Careers", href: ROUTES.landing.contact },
      { label: "Customers", href: ROUTES.landing.testimonials },
      { label: "Philosophy", href: ROUTES.landing.howItWorks },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Support", href: SITE.contact.whatsappUrl },
      { label: "Status", href: ROUTES.landing.contact },
      { label: "Migrate", href: ROUTES.landing.getStarted },
      { label: "Knowledge base", href: ROUTES.landing.faq },
      { label: "Legal policies", href: ROUTES.legal.terms },
    ],
  },
]

export const footer = {
  description:
    "Revolutionizing the fitness industry in Nepal with powerful, all-in-one management software tailored specifically for your gym's growth.",
  status: "All systems operational",
  closing: "Made for the fitness businesses of tomorrow.",
  watermark: "Gym Udaan",
}

// 404 and error pages (app/not-found.tsx, app/error.tsx).
export const notFoundPage = {
  title: "Page not found",
  badge: "404",
  heading: "This page skipped leg day",
  description:
    "We couldn't find the page you were looking for. It may have been moved or renamed.",
  actions: [
    { label: "Back to home", href: ROUTES.home, variant: "brand" },
    { label: "Read the blog", href: ROUTES.blogs, variant: "dark" },
  ] satisfies LinkAction[],
}

export const errorPage = {
  title: "Something went wrong",
  badge: "Error",
  heading: "Something went wrong",
  description:
    "An unexpected error stopped this page from loading. Try again, and if it keeps happening, head back home.",
  retry: "Try again",
  home: { label: "Back to home", href: ROUTES.home },
  reference: "Error reference:",
}
