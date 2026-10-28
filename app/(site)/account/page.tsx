import type { Metadata } from "next"
import { Suspense } from "react"

import AccountSummaryCard from "@/components/settings/AccountSummaryCard"
import AccountSummarySkeleton from "@/components/settings/skeletons/AccountSummarySkeleton"
import Typography from "@/components/ui/Typography"
import { requireRole } from "@/lib/auth/permissions"
import { ALL_ROLES } from "@/lib/auth/roles"

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
}

const AccountSection = async () => {
  const user = await requireRole(...ALL_ROLES)

  return <AccountSummaryCard user={user} />
}

const AccountPage = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <Typography variant="h3" as="h2">
          Account
        </Typography>
        <Typography variant="muted">
          The details tied to your sign-in.
        </Typography>
      </div>

      <Suspense fallback={<AccountSummarySkeleton />}>
        <AccountSection />
      </Suspense>
    </div>
  )
}

export default AccountPage
