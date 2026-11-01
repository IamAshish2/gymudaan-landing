import type { Metadata } from "next"

import LegalPage from "@/components/legal/LegalPage"
import { terms } from "@/lib/legal/terms"

export const metadata: Metadata = {
  title: terms.title,
  description: terms.description,
}

const TermsPage = () => <LegalPage document={terms} />

export default TermsPage
