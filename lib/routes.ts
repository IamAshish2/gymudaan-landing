import type { UserRole } from "@/lib/auth/types"

// Every path in the app comes from here — never hardcode a path string.
export const ROUTES = {
  home: "/",
  features: "/#features",
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
  auth: {
    login: "/login",
    register: "/register",
    loginWithNext: (next: string) => `/login?next=${encodeURIComponent(next)}`,
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

// Sanitize an untrusted `next` param — only single-leading-slash paths pass
// (rejects `//` and absolute URLs), preventing open-redirect attempts.
export const sanitizeNextPath = (
  next: string | null | undefined
): string | null => {
  if (!next) return null

  if (!next.startsWith("/")) return null

  if (next.startsWith("//")) return null

  return next
}
