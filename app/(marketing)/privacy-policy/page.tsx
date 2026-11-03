import type { Metadata } from "next"

import LegalPage from "@/components/legal/LegalPage"
import { privacy } from "@/lib/legal/privacy"
import { ROUTES } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo/metadata"
import { PAGE_SEO } from "@/lib/seo/pages"

export const metadata: Metadata = pageMetadata({
  path: ROUTES.legal.privacy,
  ...PAGE_SEO.privacy,
})

const PrivacyPolicyPage = () => <LegalPage document={privacy} />

export default PrivacyPolicyPage
