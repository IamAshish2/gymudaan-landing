import type { Metadata } from "next"

import LegalPage from "@/components/legal/LegalPage"
import { terms } from "@/lib/legal/terms"
import { ROUTES } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo/metadata"
import { PAGE_SEO } from "@/lib/seo/pages"

export const metadata: Metadata = pageMetadata({
  path: ROUTES.legal.terms,
  ...PAGE_SEO.terms,
})

const TermsPage = () => <LegalPage document={terms} />

export default TermsPage
