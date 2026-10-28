"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { accountNavItems } from "@/lib/nav"
import { ROUTES } from "@/lib/routes"
import { cn } from "@/lib/utils"

const SettingsNav = () => {
  const pathname = usePathname()
  const items = accountNavItems

  // The account root is itself a nav item, so it only matches exactly.
  const isActive = (href: string): boolean =>
    href === ROUTES.account.root
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`)

  const itemClass =
    "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium"

  return (
    <nav
      aria-label="Settings"
      className="flex gap-1 overflow-x-auto lg:flex-col"
    >
      {items.map((item) =>
        item.comingSoon ? (
          <div
            key={item.href}
            aria-disabled
            className={cn(
              itemClass,
              "cursor-not-allowed text-muted-foreground opacity-60"
            )}
          >
            <item.icon className="size-4" />
            {item.title}
            <Badge
              variant="secondary"
              className="ml-auto h-4 px-1.5 text-xs font-medium tracking-wide uppercase"
            >
              Soon
            </Badge>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={cn(
              itemClass,
              isActive(item.href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="size-4" />
            {item.title}
          </Link>
        )
      )}
    </nav>
  )
}

export default SettingsNav
