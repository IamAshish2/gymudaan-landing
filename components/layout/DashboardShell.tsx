import type { ReactNode } from "react"

import DashboardHeader from "@/components/layout/DashboardHeader"
import DashboardSidebar from "@/components/layout/DashboardSidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import type { SessionUser } from "@/lib/auth/types"
import type { DashboardSurface } from "@/lib/nav"

type DashboardShellProps = {
  surface: DashboardSurface
  user: SessionUser
  children: ReactNode
}

/** Sidebar + header shell shared by the `(dashboard)` and `(admin)` surfaces. */
const DashboardShell = ({ surface, user, children }: DashboardShellProps) => (
  <TooltipProvider>
    <SidebarProvider>
      <DashboardSidebar surface={surface} />
      <SidebarInset className="min-w-0">
        <DashboardHeader surface={surface} user={user} />
        <div className="min-h-svh min-w-0 flex-1 bg-secondary/40 p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  </TooltipProvider>
)

export default DashboardShell
