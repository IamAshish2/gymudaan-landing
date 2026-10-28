import type { Metadata } from "next"
import { Suspense } from "react"

import UserStatsCards from "@/components/users/UserStatsCards"
import UserStatsCardsSkeleton from "@/components/users/skeletons/UserStatsCardsSkeleton"
import Typography from "@/components/ui/Typography"
import { requireRole } from "@/lib/auth/permissions"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

const AdminOverviewPage = async () => {
  const user = await requireRole("ADMIN")

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" as="h1">
          Overview
        </Typography>
        <Typography variant="muted">Signed in as {user.email}</Typography>
      </div>

      <Suspense fallback={<UserStatsCardsSkeleton />}>
        <UserStatsCards />
      </Suspense>
    </div>
  )
}

export default AdminOverviewPage
