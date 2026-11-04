import { builtForNepal } from "@/lib/landing/content"
import { ROUTES } from "@/lib/routes"
import { absoluteUrl } from "@/lib/seo/site-url"
import { SITE } from "@/lib/site"

// schema.org JSON-LD for the site's entities, connected by stable @ids. Only
// facts the site itself shows (or the live site's own footer links) go in:
// no ratings, reviews, customer counts or offers. Add `offers` to the
// SoftwareApplication only with confirmed pricing (docs/seo/08 §7).

type JsonLd = Record<string, unknown>

const ids = {
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
  software: absoluteUrl("/#software"),
}

const organization = (): JsonLd => ({
  "@type": "Organization",
  "@id": ids.organization,
  name: SITE.name,
  // The spelling used by the live site, social handles and app stores.
  alternateName: "GymUdaan",
  url: absoluteUrl(ROUTES.home),
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/landing/brand/logo-emblem-colored.webp"),
    width: 1045,
    height: 681,
  },
  email: SITE.contact.email,
  telephone: SITE.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Itahari",
    addressCountry: "NP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    areaServed: "NP",
  },
  // The country plus the cities named on the homepage's Built for Nepal
  // section, so the markup only states what the page shows.
  areaServed: [
    { "@type": "Country", name: "Nepal" },
    ...builtForNepal.cities.map((city) => ({
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "Country", name: "Nepal" },
    })),
  ],
  parentOrganization: {
    "@type": "Organization",
    name: SITE.operator.name,
    url: SITE.operator.url,
  },
  sameAs: Object.values(SITE.socials),
})

const website = (): JsonLd => ({
  "@type": "WebSite",
  "@id": ids.website,
  url: absoluteUrl(ROUTES.home),
  name: SITE.name,
  inLanguage: "en",
  publisher: { "@id": ids.organization },
})

const software = (): JsonLd => ({
  "@type": "SoftwareApplication",
  "@id": ids.software,
  name: SITE.name,
  description: SITE.description,
  url: absoluteUrl(ROUTES.home),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  publisher: { "@id": ids.organization },
})

/** Homepage: the organization, website and product as one graph. */
export const homeJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": [organization(), website(), software()],
})

/**
 * /about: an AboutPage whose subject is the organization. The organization
 * node is repeated (same @id as the homepage) so the page stands on its own.
 */
export const aboutPageJsonLd = (page: {
  path: string
  title: string
  description: string
}): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": absoluteUrl(`${page.path}#webpage`),
      url: absoluteUrl(page.path),
      name: page.title,
      description: page.description,
      inLanguage: "en",
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.organization },
      mainEntity: { "@id": ids.organization },
    },
    organization(),
  ],
})

/**
 * /plans: the product's plans as Offers, built from the visible plan cards
 * (same @id as the homepage SoftwareApplication, so the two merge). Prices
 * are the cards' NPR amounts; nothing is added that the page doesn't show.
 */
export const pricingOffersJsonLd = (
  plans: readonly { name: string; price: string }[]
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": ids.software,
  name: SITE.name,
  url: absoluteUrl(ROUTES.home),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  offers: plans.map((plan) => {
    const amount = plan.price.replace(/[^\d.]/g, "")
    if (!/^NPR\s/.test(plan.price) || !amount) {
      throw new Error(`Plan "${plan.name}" price must be "NPR <amount>"`)
    }
    return {
      "@type": "Offer",
      name: plan.name,
      price: amount,
      priceCurrency: "NPR",
      category: "annual subscription",
      url: absoluteUrl(ROUTES.pricing),
      availability: "https://schema.org/InStock",
    }
  }),
})

/** Breadcrumb trail ending at the current page (Home is prepended). */
export const breadcrumbJsonLd = (
  trail: { name: string; path: string }[]
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: ROUTES.home }, ...trail].map(
    (item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })
  ),
})

/** `<script>` payload, with `<` escaped so content can't close the tag. */
export const serializeJsonLd = (data: JsonLd) =>
  JSON.stringify(data).replace(/</g, "\\u003c")
