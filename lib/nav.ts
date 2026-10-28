import {
  IFileText,
  ILayoutDashboard,
  IShieldCheck,
  ISlidersHorizontal,
  IUserRound,
  IUsers,
  type LucideIcon,
} from "@/lib/icons"
import { ROUTES } from "@/lib/routes"

// Single source of truth for every sidebar, settings nav and the command
// palette. Client components look sections up by surface name, since icon
// components can't be passed as props from a server component.

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  /** Page for this route hasn't shipped yet — render disabled with a badge. */
  comingSoon?: boolean
}

export type NavSection = {
  /** Omit on the first section so it renders flat (no group heading). */
  label?: string
  items: NavItem[]
}

export type DashboardSurface = "dashboard" | "admin"

const dashboardNav: NavSection[] = [
  {
    items: [
      {
        title: "Overview",
        href: ROUTES.dashboard.root,
        icon: ILayoutDashboard,
      },
      { title: "Editor", href: ROUTES.dashboard.editor, icon: IFileText },
    ],
  },
]

const adminNav: NavSection[] = [
  {
    items: [
      { title: "Overview", href: ROUTES.admin.root, icon: ILayoutDashboard },
    ],
  },
  {
    label: "Platform",
    items: [{ title: "Users", href: ROUTES.admin.users, icon: IUsers }],
  },
]

// Public site header + footer links (text only, no icons).
export const SITE_NAV_LINKS: { title: string; href: string }[] = [
  { title: "Home", href: ROUTES.home },
  { title: "Features", href: ROUTES.features },
]

export const accountNavItems: NavItem[] = [
  { title: "Account", href: ROUTES.account.root, icon: IUserRound },
  { title: "Security", href: ROUTES.account.security, icon: IShieldCheck },
  {
    title: "Preferences",
    href: ROUTES.account.preferences,
    icon: ISlidersHorizontal,
  },
]

export const NAV_BY_SURFACE: Record<
  DashboardSurface,
  { label: string; home: string; sections: NavSection[] }
> = {
  dashboard: {
    label: "Dashboard",
    home: ROUTES.dashboard.root,
    sections: dashboardNav,
  },
  admin: { label: "Admin", home: ROUTES.admin.root, sections: adminNav },
}
