import type { UserRole } from "@/lib/auth/types"

// Every path in the app comes from here — never hardcode a path string.
export const ROUTES = {
  home: "/",
  features: "/#features",
  // The live site's indexed pricing URL, kept as canonical (docs/seo/03 §3).
  // /pricing 308-redirects here (next.config.ts).
  pricing: "/plans",
  legacyPricing: "/pricing",
  // Linked from the footer (Resources); not in the nav or sitemap yet.
  about: "/about",
  blogs: "/blogs",
  blogPost: (slug: string) => `/blogs/${slug}`,
  onboarding: "/onboarding",
  login: "/login",
  legal: {
    terms: "/terms",
    privacy: "/privacy-policy",
  },
  // Landing page section anchors (ids set in components/landing/sections).
  landing: {
    services: "/#services",
    features: "/#features",
    audiences: "/#who-we-serve",
    control: "/#control",
    howItWorks: "/#how-we-work",
    testimonials: "/#testimonials",
    insights: "/#insights",
    getStarted: "/#get-started",
    faq: "/#faq",
    contact: "/#contact",
  },
  account: {
    root: "/account",
    security: "/account/security",
    preferences: "/account/preferences",
  },
  dashboard: {
    root: "/dashboard",
    editor: "/dashboard/editor",
  },
  admin: {
    root: "/admin",
    users: "/admin/users",
  },
} as const

// Where to land after login, based on role
export const roleHome = (role: UserRole): string => {
  switch (role) {
    case "ADMIN":
      return ROUTES.admin.root
    default:
      return ROUTES.dashboard.root
  }
}
