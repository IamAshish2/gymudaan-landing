# 06 — SEO Quality Assurance

Automated checks live in `tests/seo/` and use only Node's built-in test runner and `fetch`: **no extra dependencies**.

## 1. How to run

```sh
# Unit: build-time environment guard (lib/seo/site-env.ts). Node ≥ 22.18.
npm run test:seo:unit

# Integration: against a built, running server
SITE_ENV=production NEXT_PUBLIC_SITE_URL=https://www.gymudaan.com npm run build
npx next start -p 3100
SEO_BASE_URL=http://localhost:3100 SEO_EXPECT=production npm run test:seo

# Staging build
SITE_ENV=staging NEXT_PUBLIC_SITE_URL=https://staging.gymudaan.com npm run build
npx next start -p 3100
SEO_BASE_URL=http://localhost:3100 SEO_EXPECT=staging SEO_ORIGIN=https://staging.gymudaan.com npm run test:seo
```

Run it against the real staging host before launch, and against production right after (read-only requests).

## 2. What the suite verifies (34 integration checks + 16 unit cases)

| Area | Checks |
|---|---|
| Metadata | Every indexable page (`/`, `/plans`, `/terms`, `/privacy-policy`): 200, exactly one canonical = its own URL, matching `og:url`, one `<title>` ≤ 60 chars, description 70–160 chars, an `og:image`, exactly one H1 with the expected topic; titles and descriptions unique across pages |
| Indexing | Production: no `X-Robots-Tag`, no robots meta on indexable pages. Staging: `X-Robots-Tag: noindex, nofollow` and `noindex` meta everywhere |
| Structured data | JSON-LD parses; homepage `@graph` = Organization + WebSite + SoftwareApplication with `@id`s on the site origin; **no ratings/reviews**; FAQPage on the homepage only and every answer is visible text; BreadcrumbList on inner pages ends at the page's own URL |
| robots.txt | Never `Disallow: /`; never blocks `/_next` or `/onboarding`; production carries the live app disallows and the `Sitemap:` line; staging has no `Sitemap:` |
| Sitemap | Production = exactly the 4 indexable URLs, no fabricated `lastmod`; staging empty |
| Status codes | `/pricing` 308 → `/plans` and `/plans/` 308 → `/plans`, each **one hop** to a 200; real 404s for unknown, mixed-case, malformed and nested blog URLs; `/blogs` and drafts 404 in production, 200 in staging |
| Auth (unchanged) | `/dashboard`, `/admin`, `/account`: 307 → `/` without a session cookie, 200 with one |
| Content | Production HTML has none of the removed claims/template content (`#1`, `+40%`, `10K+`, `100+`, placeholder testimonial, status pill, template socials); unapproved sections absent in production, present in staging |
| Links | Every internal link on the indexable pages resolves (following one redirect) and every `#anchor` exists; Terms and Privacy linked from the footer |
| Env guard (unit) | Missing/invalid `SITE_ENV`, wrong production origin, staging using the production origin, Vercel/Netlify/Cloudflare Pages previews labelled production → all rejected |

## 3. Results on 2026-11-04

| Run | Result |
|---|---|
| Unit | 16 / 16 |
| Production build | 34 / 34 |
| Staging build | 33 / 33 (1 production-only check skipped by design) |

## 4. Manual / browser checks (not in the suite)

These were run with Playwright from a scratch directory (not a project dependency):

- **FAQ accordion:** all answers in the DOM; closed ones hidden from the a11y tree; open/close animates (none under reduced motion); Enter/Space toggle: pass on `/` and `/plans`.
- **Screenshots** at 1440 × 900 and 390 × 844 for visual review.
- **axe-core (WCAG 2.2 AA + best practice):**
  - **Fixed:** logo links' accessible name didn't contain the visible wordmark (2.5.3); pricing add-ons list had `role="group"` breaking list semantics.
  - **Open (decision):** white on brand orange `#ff6a00` buttons = **2.87:1** (AA needs 4.5:1 for normal text). Changing the brand colour or button text colour is a design decision. The footer watermark is decorative (exempt).
  - **Open (low):** the client-logo strip becomes a scrollable region without a focusable element **only under reduced motion**.
  - **Likely false positive:** `landmark-unique` on `#services` / `#who-we-serve` (their names are different headings).
- Lighthouse and throttled traces: docs/seo/05.

Recommended addition when you accept a dev dependency: move the Playwright FAQ/screenshot/axe scripts into the repo (`@playwright/test`, `@axe-core/playwright`).
