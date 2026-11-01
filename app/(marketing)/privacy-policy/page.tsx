import type { Metadata } from "next"

import LegalPage from "@/components/legal/LegalPage"
import { privacy } from "@/lib/legal/privacy"

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
}

const PrivacyPolicyPage = () => <LegalPage document={privacy} />

export default PrivacyPolicyPage
