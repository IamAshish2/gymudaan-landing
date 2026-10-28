import type { Metadata } from "next"

import AppearanceCard from "@/components/settings/AppearanceCard"
import Typography from "@/components/ui/Typography"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Preferences",
  robots: { index: false, follow: false },
}

const PreferencesPage = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <Typography variant="h3" as="h2">
          Preferences
        </Typography>
        <Typography variant="muted">
          Personalize how {SITE.name} works for you.
        </Typography>
      </div>

      <AppearanceCard />
    </div>
  )
}

export default PreferencesPage
