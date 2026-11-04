import type { Metadata } from "next"

import LegalPage from "@/components/legal/LegalPage"
import JsonLd from "@/components/shared/JsonLd"
import { privacy } from "@/lib/legal/privacy"
import { ROUTES } from "@/lib/routes"
import { breadcrumbJsonLd } from "@/lib/seo/json-ld"
import { pageMetadata } from "@/lib/seo/metadata"
import { PAGE_SEO } from "@/lib/seo/pages"

export const metadata: Metadata = pageMetadata({
  path: ROUTES.legal.privacy,
  ...PAGE_SEO.privacy,
})

const PrivacyPolicyPage = () => (
  <>
    <JsonLd
      data={breadcrumbJsonLd([
        { name: "Privacy Policy", path: ROUTES.legal.privacy },
      ])}
    />
    <LegalPage document={privacy} />
  </>
)

export default PrivacyPolicyPage
