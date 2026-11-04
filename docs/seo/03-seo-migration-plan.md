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
| 2 | `/plans` | ✔ | **`/plans` (implemented).** The pricing page lives at `/plans` (canonical, sitemap, all links via `ROUTES.pricing`); `/pricing` 308 → `/plans` in one hop. Verified no conflict with any live app route (docs/seo/09) | Keep | 200 (`/pricing` 308) |
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

**Indexing state of the live app routes (verified 2026-11-03, headless render, read-only):**

| Route | HTTP | Renders | robots meta | In live robots.txt |
|---|---|---|---|---|
| `/auth` | 200 | Login form | none | `Disallow: /auth/` (exact `/auth` itself is **not** matched) |
| `/tenant/home` | 200 | Login form | none | **not blocked** |
| `/super/` | 200 | Login form | none | blocked |
| `/affiliate/` | 200 | Login form | none | **not blocked** |
| `/checkins/<any-name>` | 200 | Working check-in form for any name, including non-existent ones | none | **not blocked** |
| `/workout/<any-name>` | 200 | "No public workout plans available." | none | **not blocked** |
| `/getting-started` | 200 | The homepage, `index, follow`, canonical `/` | index, follow | blocked |
| `/unauthorized`, `/oauth2/redirect` | 200 | Status / loading screen | none | not blocked |

robots.txt only stops crawling. A blocked URL can still be indexed URL-only from links, and a `noindex` on a blocked page is never seen. **Recommendation for the app team (outside this repo, not implemented):** send `X-Robots-Tag: noindex` on every app route (a header works for a client-rendered SPA without HTML changes), and return 404 for unknown `/checkins/*` and `/workout/*` names. This repo's `robots.ts` carries the live disallow list over verbatim (`lib/seo/crawl.ts`). `/tenant/`, `/affiliate/`, `/checkins/` and `/workout/` are deliberately **not** added until the routing and indexing audit is reviewed.

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

## 11. Pre-launch requirements (open launch gates)

These are open. Each one blocks a production launch until it is resolved.

| # | Requirement | Current state (repo) | Resolves in |
|---|---|---|---|
| L1 | ~~Unpublished blog articles return a real HTTP 404 in production~~ **Resolved in repo (Phase 5).** | `proxy.ts` decides before rendering, from `lib/blog/registry.ts`. Production: published 200, drafts and unknown slugs **404**. Staging/preview/development: drafts 200 with `noindex, nofollow` (protected preview), unknown slugs 404. Verified with real status codes, including mixed case, encoded, malformed (previously **500**), nested and trailing-slash variants | Done; protected preview depends on L7 |
| L2 | ~~Unpublished articles must not appear in public blog listings~~ **Resolved for launch.** | Production builds hide the whole blog while nothing is published: `/blogs` 404s (proxy), nav/footer blog links and the homepage Insights cards are removed (`isBlogPublic`, `lib/blog/registry.ts`). **When the first article is published**, the listing's placeholder posts (`lib/blog/content.ts`) must be replaced with real ones before flipping the flag | Content, at first publication |
| L3 | ~~The pricing URL follows the final migration plan~~ **Resolved in repo.** | `/plans` canonical + sitemap; `/pricing` 308 → `/plans` | Done |
| L4 | `/blogs` becomes indexable automatically once an article has `published: true`. Confirm the article is real and approved first | `/blogs` is `noindex`; `hasPublishedArticles` is false | Content sign-off |
| L5 | App routes get `X-Robots-Tag: noindex` / real 404s on the app side (see §3b) | Not in this repo | App team |
| L6 | Search Console access and the pre-launch baseline (GSC + GA4 exports, crawl) | Not available | Business |
| L7 | **Hosting-side access protection on every non-production deployment** (staging, every preview URL). This is the primary control; `noindex` is the backstop | Not configured (hosting not chosen). The repo side is done: see §12 | Platform owner |
| L8 | Every build pipeline sets `SITE_ENV` (and `NEXT_PUBLIC_SITE_URL`) per environment, per §12. A missing value fails the build | Not configured | Platform owner |
| L9 | **Content approvals:** testimonials (`approved` per tile) and stats (`stats.approved`) are hidden in production until approved; logos need permission; pricing cards are placeholders | Gated in code (`lib/content-approval.ts`) | Business |
| L10 | **Hero entrance animation**: its opacity fade keeps the hero frame out of Chrome's LCP (≈3.7 s throttled vs ≈1.9 s without it) | Measured, not changed (design decision) | Business / design (docs/seo/05 §3) |
| L11 | GA4 property confirmation; set `NEXT_PUBLIC_GA_MEASUREMENT_ID` for production | Code ready, ID not set | Business / platform |
| L12 | Brand-orange button contrast 2.87:1 (WCAG AA needs 4.5:1 for normal text) | Measured, not changed (design decision) | Design (docs/seo/06 §4) |
| L13 | Routing architecture + cookie-name check before cutover | docs/seo/09 | Platform / app team |

## 12. Build environments and hosting configuration

The repo side is implemented in `lib/seo/site-env.ts`, `lib/seo/indexing.ts` and `next.config.ts`. Validation runs once at `next build`. The result is inlined into the build, so `next start` and request-time rendering cannot change it. Verified: a production build served with a staging runtime env stays indexable, and a staging build served with a production runtime env stays `noindex`.

| `SITE_ENV` | `NEXT_PUBLIC_SITE_URL` | Indexing | Responses |
|---|---|---|---|
| `production` | must be exactly `https://www.gymudaan.com` | as designed per page (Phase 3) | no `X-Robots-Tag`; Phase 3 robots.txt and sitemap |
| `staging` / `preview` / `development` | its own origin; **must not** be `https://www.gymudaan.com` | none | `X-Robots-Tag: noindex, nofollow` on every response except Next's built-in trailing-slash 308 redirects (see note); `noindex, nofollow` meta; robots.txt `Allow: /` with no sitemap; empty sitemap |
| missing / other | — | **build fails** | — |

**Note (corrects the Phase 4 report):** Next.js issues its trailing-slash redirects (e.g. `/pricing/` → 308 `/pricing`) before custom `headers()` apply, so those redirect responses carry no `X-Robots-Tag`. This doesn't affect indexing: a redirect has no indexable content, and its destination carries `noindex, nofollow`. Hosting-side protection (L7) covers them anyway.

**Hosting cross-checks** run only on their own platform. Where a platform says a build is not its production deployment, `SITE_ENV=production` fails the build.

| Host | Signal checked | What to configure |
|---|---|---|
| Vercel | `VERCEL_ENV` must be `production` | Production env: `SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://www.gymudaan.com`. Preview env: `SITE_ENV=preview`, `NEXT_PUBLIC_SITE_URL` = a stable non-production origin (e.g. a staging domain). Turn on **Deployment Protection** (Vercel Authentication or password) for preview deployments |
| Netlify | `CONTEXT` must be `production` | Per-context env vars as above; turn on site/password protection for deploy previews and branch deploys |
| Cloudflare Pages | `CF_PAGES_BRANCH` must equal `SITE_PRODUCTION_BRANCH` | Set `SITE_PRODUCTION_BRANCH`; protect preview deployments with **Cloudflare Access** |
| VPS / other CI | none available | Set both variables explicitly per environment; put staging behind the reverse proxy's authentication or an IP allow-list |

The rule that non-production builds may not use the production origin also catches a production deploy mislabelled as staging, which would otherwise noindex the live site.
