import type { ReactNode } from "react"

import SettingsNav from "@/components/settings/SettingsNav"
import SectionShell from "@/components/shared/SectionLayout"
import GridContainer from "@/components/ui/GridContainer"
import Typography from "@/components/ui/Typography"
import { requireRole } from "@/lib/auth/permissions"
import { ALL_ROLES } from "@/lib/auth/roles"

type AccountLayoutProps = {
  children: ReactNode
}

const AccountLayout = async ({ children }: AccountLayoutProps) => {
  await requireRole(...ALL_ROLES)

  return (
    <SectionShell firstSection>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <Typography variant="h2" as="h1">
            Account settings
          </Typography>
          <Typography variant="muted">
            Manage your profile, security, and preferences.
          </Typography>
        </div>

        <GridContainer className="gap-4 md:gap-6">
          <div className="col-span-full lg:col-span-3">
            <SettingsNav />
          </div>

          <div className="col-span-full min-w-0 lg:col-span-9">{children}</div>
        </GridContainer>
      </div>
    </SectionShell>
  )
}

export default AccountLayout
