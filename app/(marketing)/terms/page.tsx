import type { Metadata } from "next"

import LegalPage from "@/components/legal/LegalPage"
import { terms } from "@/lib/legal/terms"
import { ROUTES } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = pageMetadata({
  path: ROUTES.legal.terms,
  title: terms.title,
  description: terms.description,
})

const TermsPage = () => <LegalPage document={terms} />

export default TermsPage
