"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IZap } from "@/lib/icons"
import {
  NAV_BY_SURFACE,
  type DashboardSurface,
  type NavItem,
  type NavSection,
} from "@/lib/nav"
import { SITE } from "@/lib/site"

type DashboardSidebarProps = {
  surface: DashboardSurface
}

// "Soon" items (lib/nav.ts) render disabled so planned pages show without
// linking to a 404.
const DashboardSidebar = ({ surface }: DashboardSidebarProps) => {
  const pathname = usePathname()
  const { label, home, sections } = NAV_BY_SURFACE[surface]

  // The surface root is itself a nav item, so it only matches exactly.
  const isActive = (href: string): boolean =>
    href === home
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`)

  const renderItem = (item: NavItem) => (
    <SidebarMenuItem key={item.href}>
      {item.comingSoon ? (
        <SidebarMenuButton
          disabled
          tooltip={`${item.title} (coming soon)`}
          className="cursor-not-allowed opacity-60"
        >
          <item.icon />
          <span className="truncate">{item.title}</span>
          <Badge
            variant="secondary"
            className="ml-auto h-4 px-1.5 text-xs font-medium tracking-wide uppercase"
          >
            Soon
          </Badge>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton
          asChild
          tooltip={item.title}
          isActive={isActive(item.href)}
          className="hover:bg-sidebar-accent hover:font-normal hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-active:bg-primary data-active:text-primary-foreground data-active:hover:bg-primary data-active:hover:font-medium data-active:hover:text-primary-foreground"
        >
          <Link href={item.href}>
            <item.icon />
            <span className="truncate">{item.title}</span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  )

  const renderSection = (section: NavSection, idx: number) => (
    <SidebarGroup key={section.label ?? `section-${idx}`}>
      {section.label && <SidebarGroupLabel>{section.label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>{section.items.map(renderItem)}</SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={SITE.name}>
              <Link href={home}>
                <IZap className="size-5! shrink-0 text-primary" />
                <div className="flex min-w-0 flex-col leading-none">
                  <span className="truncate text-sm font-semibold">
                    {SITE.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {label}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-2">
        {sections.map(renderSection)}
      </SidebarContent>
    </Sidebar>
  )
}

export default DashboardSidebar
