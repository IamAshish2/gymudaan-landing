import type { Metadata } from "next"

import LegalPage from "@/components/legal/LegalPage"
import JsonLd from "@/components/shared/JsonLd"
import { terms } from "@/lib/legal/terms"
import { ROUTES } from "@/lib/routes"
import { breadcrumbJsonLd } from "@/lib/seo/json-ld"
import { pageMetadata } from "@/lib/seo/metadata"
import { PAGE_SEO } from "@/lib/seo/pages"

export const metadata: Metadata = pageMetadata({
  path: ROUTES.legal.terms,
  ...PAGE_SEO.terms,
})

const TermsPage = () => (
  <>
    <JsonLd
      data={breadcrumbJsonLd([
        { name: "Terms of Service", path: ROUTES.legal.terms },
      ])}
    />
    <LegalPage document={terms} />
  </>
)

export default TermsPage
