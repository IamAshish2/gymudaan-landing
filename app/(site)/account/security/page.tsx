import type { Metadata } from "next"

import SecurityForm from "@/components/settings/SecurityForm"
import Typography from "@/components/ui/Typography"

export const metadata: Metadata = {
  title: "Security",
  robots: { index: false, follow: false },
}

// Guarded by the account layout; changePasswordAction re-checks the session.
const SecurityPage = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <Typography variant="h3" as="h2">
          Security
        </Typography>
        <Typography variant="muted">
          Update your password. This signs you out of other devices.
        </Typography>
      </div>

      <SecurityForm />
    </div>
  )
}

export default SecurityPage
