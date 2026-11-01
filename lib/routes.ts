import type { UserRole } from "@/lib/auth/types"

// Every path in the app comes from here — never hardcode a path string.
export const ROUTES = {
  home: "/",
  features: "/#features",
  pricing: "/pricing",
  blogs: "/blogs",
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
