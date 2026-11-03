import type { Metadata } from "next"

import LegalPage from "@/components/legal/LegalPage"
import { privacy } from "@/lib/legal/privacy"
import { ROUTES } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = pageMetadata({
  path: ROUTES.legal.privacy,
  title: privacy.title,
  description: privacy.description,
})

const PrivacyPolicyPage = () => <LegalPage document={privacy} />

export default PrivacyPolicyPage
