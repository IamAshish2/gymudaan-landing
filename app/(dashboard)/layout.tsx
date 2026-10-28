import DashboardShell from "@/components/layout/DashboardShell"
import { requireRole } from "@/lib/auth/permissions"

const DashboardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const user = await requireRole("USER")

  return (
    <DashboardShell surface="dashboard" user={user}>
      {children}
    </DashboardShell>
  )
}

export default DashboardLayout
