import CommandPalette from "@/components/layout/CommandPalette"
import NavbarUserMenu from "@/components/layout/NavbarUserMenu"
import ThemeToggle from "@/components/shared/ThemeToggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { SessionUser } from "@/lib/auth/types"
import type { DashboardSurface } from "@/lib/nav"

type DashboardHeaderProps = {
  surface: DashboardSurface
  user: SessionUser
}

const DashboardHeader = ({ surface, user }: DashboardHeaderProps) => (
  <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background">
    <div className="flex w-full min-w-0 items-center gap-2 px-4 md:px-6">
      <SidebarTrigger className="-ml-1" />

      <CommandPalette surface={surface} />

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <NavbarUserMenu user={user} />
      </div>
    </div>
  </header>
)

export default DashboardHeader
