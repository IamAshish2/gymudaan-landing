# 03 — SEO-Safe Migration Plan

**Status: PROPOSAL, awaiting approval. Nothing here has been implemented or deployed.**

Evidence lives in 01 (live site) and 02 (new codebase).

## 1. Fixed decisions (based on verified behaviour)

| Item | Value | Basis |
|---|---|---|
| Canonical origin | `https://www.gymudaan.com` | Apex and HTTP both 301 there today; every live canonical and sitemap URL uses it |
| Trailing slash | none (`/pricing`, not `/pricing/`) | Live canonicals have none; Next default 308-strips |
| Homepage canonical | `https://www.gymudaan.com/` | Equivalent to the live `https://www.gymudaan.com` |
| Apex/HTTP redirects | **Keep the existing Cloudflare 301s untouched** | They work. Don't re-implement them in the app |

## 2. The blocker: the marketing site and the SaaS app share one host

Today `www.gymudaan.com` serves **one SPA** that contains both the marketing pages and the full gym-management app (`/auth`, `/tenant/*`, `/super/*`, `/affiliate/*`, `/checkins/:businessName`, `/workout/:businessName`, `/oauth2/redirect`, `/oauth2/error`, `/getting-started`, `/unauthorized`, plus `/assets/*` bundles). The new Next.js project contains **only the marketing site**.

If DNS or the origin is switched to the new app as-is, every app URL returns 404. Gym owners lose their dashboard, members' QR check-ins fail, and OAuth callbacks break.

**Options (a decision is needed; see §9 Q1):**

| Option | How | SEO impact | Effort/risk |
|---|---|---|---|
| **A. Path-based routing at the edge (recommended if the app must stay on www)** | Cloudflare (Worker or Origin Rules) sends `/`, `/plans` or `/pricing`, `/blogs*`, `/privacy-policy`, `/terms`, `/robots.txt`, `/sitemap.xml`, `/_next/*`, `/video/*`, OG images → **Next app**. Everything else (`/auth*`, `/tenant*`, `/super*`, `/affiliate*`, `/checkins*`, `/workout*`, `/oauth2*`, `/getting-started`, `/unauthorized`, `/assets/*`, `/favicon*`) → **existing SPA origin** | None. URLs are unchanged | Medium. Needs an explicit allow-list and tests for both sides |
| B. Next.js `rewrites` fallback to the SPA origin | `next.config.ts` `rewrites().fallback` proxies unmatched paths to the old origin | None | Low config, but every app request passes through the Next server; the not-found behaviour of the marketing site gets complicated |
| C. Move the app to `app.gymudaan.com` first | Separate project led by the app team; 301 old app paths to `app.` | Low (app pages are not search assets) | High. OAuth redirect URIs, Meta/TikTok app config, saved bookmarks and printed QR codes for `/checkins/*` would all need to change |

Until one option is chosen and tested, **launch is blocked**.

## 3. Old → new URL mapping

Sources: live sitemap, live route table (bundle), rendered internal links. No GSC data yet, so **every row is marked to be confirmed against GSC Pages + Links**. GSC may reveal other indexed URLs (e.g. old `?ref=` variants or a previous site's paths); add them before launch.

### 3a. Marketing (indexable)

| # | Old URL (live, 200) | In live sitemap | New destination | Action | Status code |
|---|---|---|---|---|---|
| 1 | `/` | ✔ | `/` | Keep | 200 |
| 2 | `/plans` | ✔ | **Decision Q2.** Recommended: keep `/plans` as the canonical pricing URL (this follows "keep the exact URL when purpose is unchanged"), with `/pricing` 308 → `/plans`. Alternative: keep `/pricing` and 308 `/plans` → `/pricing` | Keep or redirect | 200 / 308 |
| 3 | `/privacy-policy` | ✔ | `/privacy-policy` | Keep (URL is likely registered with Meta/TikTok/app stores) | 200 |
| 4 | `/terms` | ✔ | `/terms` | Keep | 200 |
| 5 | — | — | `/blogs` | New | 200 |
| 6 | — | — | `/blogs/manage-gym-efficiently` | New (after real content) | 200 |

### 3b. Application (non-indexable, must keep working)

| Old URL pattern | Destination | Indexing |
|---|---|---|
| `/auth`, `/getting-started`, `/unauthorized`, `/oauth2/redirect`, `/oauth2/error` | Existing SPA origin (Option A/B), unchanged | Keep the robots disallow. `/oauth2/*` must not redirect |
| `/tenant/*`, `/super/*`, `/affiliate/*` | Existing SPA origin | Disallowed / behind login |
| `/checkins/:businessName`, `/workout/:businessName` | Existing SPA origin | **Verify** with GSC whether these are indexed; recommend `noindex` on the app side |
| `/assets/*` (SPA bundles), `/real-gymudaanlogo.jpeg`, `/favicon-*.png`, `/apple-touch-icon.png` | Existing origin (the SPA and old OG shares need them) | — |

### 3c. Paths that currently return 200 only because of the SPA's soft-404

`/pricing`, `/blogs`, `/blog` and any random path return the homepage shell with 200 today. On the new site, `/pricing` and `/blogs` become real pages; everything else becomes a **real 404**. This is correct, and it is **not** a regression. We won't redirect unknown paths to `/`.

### 3d. Rules

- One hop only. No redirect leads to another redirect (test: `curl -IL` shows at most one 3xx).
- Redirects use 308 via `next.config.ts` `redirects()` with `permanent: true`, or a Cloudflare rule. Choose one place per redirect, never both.
- No catch-all redirect to the homepage.

## 4. Canonical consistency checklist

Every one of these must use `https://www.gymudaan.com` + the canonical path:
`<link rel=canonical>` · `og:url` · sitemap `<loc>` · robots `Sitemap:` · JSON-LD `url`/`@id`/`logo` · internal `<Link>`s (relative paths, fine) · redirect targets. Enforced by the C2 build guard and the QA tests (doc 06).

## 5. Content migration

Carry the live search intent forward, adapted to the new design. Details in doc 04, inventory in 01 §7.

1. **Homepage:** restore Nepal context and real differentiators (BS dates, eSewa/Khalti, SMS reminders, biometric/door access, multi-branch, member app + store links) inside the existing sections' copy slots. **No new sections and no layout changes.** The Services/"Our Features" section stays as it is (only its animation may change).
2. **Pricing:** use the real live tiers (14,999 / 19,999 / 24,999 NPR per year and their limits) once the business confirms they are current.
3. **FAQ:** merge the live FAQs (BS dates, switching from Excel, biometric, branches/staff, app/data safety) with the new ones.
4. **Testimonials and logos:** only approved, attributable customers. Remove placeholders.
5. **Legal:** align with the live text, including the contact section, consent and "Last Updated" date.
6. **Blog:** publish only real articles. Hide the listing or `noindex` it until at least one real article exists.

## 6. Pre-launch validation (staging)

1. Deploy to a **password-protected** staging environment with `SITE_ENV=staging` → `X-Robots-Tag: noindex`, `Disallow: /`.
2. Run the QA suite (doc 06) against staging with production env values: status codes, canonicals, titles, descriptions, OG, JSON-LD parse, sitemap URLs return 200, the redirect table resolves in one hop, no broken internal links, the app paths are proxied (Option A/B).
3. Lighthouse mobile on `/`, the pricing URL and `/blogs` (lab budgets in doc 05).
4. Manual check: Rich Results Test and the URL Inspection "Test live URL" on production after launch.
5. Capture the baseline: GSC export, GA4 export, and a crawl of the live site (Screaming Frog or equivalent).

## 7. Launch (only with explicit approval)

1. Deploy the production build with `SITE_ENV=production` and `NEXT_PUBLIC_SITE_URL=https://www.gymudaan.com`.
2. Switch the Cloudflare routing (Option A) in a low-traffic window. Keep the old origin running.
3. Immediately: `curl` every row of §3 plus 10 app URLs; check robots.txt (Googlebot not blocked, no `Disallow: /`), sitemap, and that canonicals have no `noindex`.
4. GSC: resubmit `/sitemap.xml` and inspect `/` and the pricing URL.
5. Confirm GA4 is receiving pageviews and conversion events.

## 8. Rollback

- **Trigger:** any app path failing, a sitewide `noindex`/`Disallow`, wrong canonicals, or a 5xx rate above normal.
- **How:** revert the Cloudflare routing rule so all traffic goes to the old SPA origin. That takes minutes and needs no DNS change. The old origin stays deployed and unchanged for **at least 30 days** after launch.
- After a rollback, nothing to clean up on the SEO side unless the new canonicals have been crawled for days. Even then, the old site's canonicals point to the same URLs.

## 9. Open questions (answers needed before implementation)

1. **Q1 Hosting:** which option in §2 (A path routing / B rewrites / C app subdomain)? Who owns the Cloudflare zone and the old SPA deploy?
2. **Q2 Pricing URL:** keep `/plans` (recommended, zero risk) or move to `/pricing` with a 308?
3. **Q3 Search Console:** can we get access (or an export) for the baseline?
4. **Q4 Claims:** which numbers and claims are true and approved ("#1", gym count, member count, ratings, "+40% revenue", the per-gym member counts)?
5. **Q5 Brand spelling:** "GymUdaan" or "Gym Udaan"?
6. **Q6 Pricing data:** are the live tiers (14,999 / 19,999 / 24,999 NPR, the limits and the feature list) current?
7. **Q7 Testimonials/blog:** which testimonials and articles are real and approved?

## 10. Proposed implementation sequence (after approval)

Each step is a separate, reviewable change with build + tests. UI and design stay unchanged.

| Step | Change | Files | Rollback |
|---|---|---|---|
| 1 | Site URL guard + env-based indexing (C2, C3) | `lib/seo/site-url.ts`, `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `next.config.ts` | Revert commit |
| 2 | Central metadata helper: canonical, OG, Twitter, per-page titles/descriptions (C1, H1, H2) | `lib/seo/metadata.ts`, `lib/seo/pages.ts`, marketing `page.tsx` files | Revert |
| 3 | Pricing URL + redirect (C5/Q2) | `app/(marketing)/…`, `lib/routes.ts`, `next.config.ts` | Revert |
| 4 | JSON-LD builders: Organization, WebSite, SoftwareApplication (+ real offers), BreadcrumbList, BlogPosting (M1) | `lib/seo/json-ld.ts`, pages | Revert |
| 5 | FAQ answers in SSR HTML, single-text H1 (H3, M2) | `FaqAccordion.tsx`, `Hero.tsx` | Revert |
| 6 | Real blog-slug 404 (H7) | `proxy.ts` or the blog route | Revert |
| 7 | Video/image loading performance (H4) | `AutoplayVideo.tsx`, `ClientLogoList.tsx`, re-encoded media | Revert, keep the old MP4 |
| 8 | Analytics (H5) | `app/layout.tsx` (+ possibly `@next/third-parties`) | Revert |
| 9 | Content sign-off changes (C4, H6, M3–M6) | `lib/**/content.ts`, `lib/legal/*`, `lib/site.ts` | Revert |
| 10 | QA suite (Playwright + Lighthouse CI) | `tests/seo/*`, `playwright.config.ts` (new dev dependency) | Remove |

Docs 04–07 (keyword/content architecture, performance plan, QA, launch checklist) will be written after these decisions, because their content depends on Q1–Q7.
