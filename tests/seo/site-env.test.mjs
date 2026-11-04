// Unit tests for the build-time environment guard (lib/seo/site-env.ts).
// Node ≥ 22.18 runs the .ts module directly (type stripping).
//   npm run test:seo:unit

import assert from "node:assert/strict"
import { test } from "node:test"

import { resolveSiteEnv } from "../../lib/seo/site-env.ts"

const P = "https://www.gymudaan.com"
const S = "https://staging.gymudaan.com"

const cases = [
  ["build, SITE_ENV missing", {}, true, "throw"],
  ["dev, SITE_ENV missing", {}, false, "development"],
  ["invalid value", { SITE_ENV: "prod", NEXT_PUBLIC_SITE_URL: P }, true, "throw"],
  ["wrong case", { SITE_ENV: "Production", NEXT_PUBLIC_SITE_URL: P }, true, "throw"],
  ["production on www", { SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: P }, true, "production"],
  ["production on apex", { SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://gymudaan.com" }, true, "throw"],
  ["production on staging origin", { SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: S }, true, "throw"],
  ["production without URL", { SITE_ENV: "production" }, true, "throw"],
  ["staging on its own origin", { SITE_ENV: "staging", NEXT_PUBLIC_SITE_URL: S }, true, "staging"],
  ["staging on the production origin", { SITE_ENV: "staging", NEXT_PUBLIC_SITE_URL: P }, true, "throw"],
  ["Vercel preview labelled production", { SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: P, VERCEL: "1", VERCEL_ENV: "preview" }, true, "throw"],
  ["Vercel production", { SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: P, VERCEL: "1", VERCEL_ENV: "production" }, true, "production"],
  ["Netlify deploy preview labelled production", { SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: P, NETLIFY: "true", CONTEXT: "deploy-preview" }, true, "throw"],
  ["Cloudflare Pages without production branch", { SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: P, CF_PAGES: "1", CF_PAGES_BRANCH: "main" }, true, "throw"],
  ["Cloudflare Pages feature branch", { SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: P, CF_PAGES: "1", CF_PAGES_BRANCH: "x", SITE_PRODUCTION_BRANCH: "main" }, true, "throw"],
  ["Cloudflare Pages production branch", { SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: P, CF_PAGES: "1", CF_PAGES_BRANCH: "main", SITE_PRODUCTION_BRANCH: "main" }, true, "production"],
]

for (const [name, env, requireExplicit, expected] of cases) {
  test(name, () => {
    if (expected === "throw") {
      assert.throws(() => resolveSiteEnv(env, { requireExplicit }))
    } else {
      assert.equal(resolveSiteEnv(env, { requireExplicit }), expected)
    }
  })
}
