import type { NextConfig } from "next"
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants"

import { resolveSiteEnv, type SiteEnv } from "./lib/seo/site-env"

// Media served by the backend (uploads from the rich text editor etc.). Derived
// from API_BASE_URL so pointing the app at a new backend needs no config edit.
const apiOrigin = (() => {
  try {
    return process.env.API_BASE_URL ? new URL(process.env.API_BASE_URL) : null
  } catch {
    return null
  }
})()

// SITE_ENV is validated where output is produced: strictly for `next build`
// (a bad value fails the build) and with a `development` default for
// `next dev`. `next start` only serves what the build recorded, so it does not
// re-validate.
const siteEnvFor = (phase: string): SiteEnv | undefined => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    return resolveSiteEnv(process.env, { requireExplicit: true })
  }
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return resolveSiteEnv(process.env, { requireExplicit: false })
  }
  return undefined
}

const nextConfig = (phase: string): NextConfig => {
  const siteEnv = siteEnvFor(phase)
  const indexable = siteEnv === undefined || siteEnv === "production"

  return {
    cacheComponents: true,
    // Allow testing the dev server from other devices on the LAN (phone, tablet).
    allowedDevOrigins: [
      "192.168.1.9",
      "192.168.100.7",
      "192.168.1.2",
      "192.168.1.71",
    ],
    // Inlined into the bundle at build time; read via lib/seo/indexing.ts.
    env: siteEnv ? { SEO_SITE_ENV: siteEnv } : {},
    // Non-production builds: keep every response (pages, images, video,
    // robots, sitemap) out of search indexes, whatever its content type.
    headers: async () =>
      indexable
        ? []
        : [
            {
              source: "/:path*",
              headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
            },
          ],
    // The pricing page lives at the live site's indexed URL, /plans
    // (docs/seo/03 §3). The old path of this repo redirects there in one hop.
    // Literals: keep in sync with ROUTES.legacyPricing / ROUTES.pricing.
    redirects: async () => [
      { source: "/pricing", destination: "/plans", permanent: true },
    ],
    experimental: {
      serverActions: {
        bodySizeLimit: "5mb",
      },
    },
    images: {
      remotePatterns: apiOrigin
        ? [
            {
              protocol: apiOrigin.protocol.replace(":", "") as "http" | "https",
              hostname: apiOrigin.hostname,
              pathname: "/uploads/**",
            },
          ]
        : [],
    },
  }
}

export default nextConfig
