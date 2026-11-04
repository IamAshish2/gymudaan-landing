import type { SiteEnv } from "@/lib/seo/site-env"

// SITE_ENV as validated by next.config.ts and inlined into the bundle at build
// time (`env.SEO_SITE_ENV`). Request-time rendering therefore never re-reads,
// or disagrees with, the build's environment.
export const SITE_ENV = (process.env.SEO_SITE_ENV ?? "development") as SiteEnv

/** Only production builds may be indexed. */
export const IS_INDEXABLE = SITE_ENV === "production"
