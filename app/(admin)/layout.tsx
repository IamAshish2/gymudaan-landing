import DashboardShell from "@/components/layout/DashboardShell"
import { requireRole } from "@/lib/auth/permissions"

const AdminLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const user = await requireRole("ADMIN")

  return (
    <DashboardShell surface="admin" user={user}>
      {children}
    </DashboardShell>
  )
}

export default AdminLayout
