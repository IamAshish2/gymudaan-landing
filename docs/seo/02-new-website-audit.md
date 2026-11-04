# 02 — New Codebase SEO Audit (gymudaan-landing, branch `landing/refinement`)

- **Audit date:** 2026-11-03
- **Method:** source review; `NEXT_PUBLIC_SITE_URL=https://www.gymudaan.com next build` (green, 23 routes); `next start` on :3100, probed with `curl`; HTML parsed for metadata, headings, links, images and JSON-LD.
- **No code was changed.**

## 0. What is already good (keep it)

- **Server-rendered content.** Marketing pages are Server Components and prerendered (`○` static / `◐` PPR). Headings, body copy, links and image alts are in the initial HTML. This is a big improvement over the live client-rendered SPA.
- **Native Metadata API, `robots.ts`, `sitemap.ts`, file-based OG/Twitter images** (`app/opengraph-image.jpg` 1200×630 with alt text).
- **Real 404s for unknown top-level paths** (`/nope-xyz` → 404). The live site returns 200.
- Trailing slash normalised (`/pricing/` → 308 `/pricing`). App surfaces `/dashboard`, `/admin`, `/account` are disallowed in robots and redirect anonymously. `/onboarding` is `noindex, nofollow`.
- `next/font` Poppins (3 weights, self-hosted, no layout shift from fonts). `next/image` everywhere, with alts on content images and `alt=""` on decorative ones.
- Motion: CSS-first hero entrance, IntersectionObserver reveals with a `<noscript>` fallback, `prefers-reduced-motion` honoured, and the video has a pause control (WCAG 2.2.2).
- JSON-LD is escaped (`<` → `<`). It doesn't claim ratings or prices.
- Single semantic `<main>`, `<header>`/`<footer>`/`<nav aria-label>`, and an `<address>` for contact info.

---

## 1. Critical (launch blockers)

### C1. No canonical URL on any page
- **Files:** `app/layout.tsx`, every `app/(marketing)/**/page.tsx`
- **Evidence:** none of the built pages contains `rel="canonical"`. The live site has a canonical on all 4 pages.
- **Why it matters:** if canonicals go away during a migration, Google has to pick its own canonical (the `?utm=` variants, the apex host if a redirect fails, etc.).
- **Fix:** add a `buildMetadata({ path, title, description, … })` helper in `lib/seo/metadata.ts` that sets `alternates.canonical` to the page's own absolute path, plus `openGraph.url`. Call it from each page's `metadata`/`generateMetadata`. **Don't** set a canonical in the root layout: a relative canonical there resolves to the homepage for every page.
- **Verify:** an automated test asserts that every sitemap URL's HTML has exactly one canonical equal to itself.

### C2. Site URL silently falls back to `http://localhost:3000`
- **Files:** `app/layout.tsx` (`metadataBase`), `app/robots.ts`, `app/sitemap.ts`
- **Why:** if `NEXT_PUBLIC_SITE_URL` is missing in the production build env, the sitemap `<loc>`s, robots `Sitemap:` line, OG image URLs and (after C1) canonicals all point to `localhost`. This would break canonicalisation site-wide without any error.
- **Fix:** add a `lib/seo/site-url.ts` that reads the env var once and **fails the build** when it is missing or not `https://www.gymudaan.com` in a production deploy. Every SEO surface imports from it.
- **Verify:** a build without the env var fails; `curl /sitemap.xml` shows only `https://www.gymudaan.com/...`.

### C3. No protection against indexing of staging/preview deployments
- **Files:** `app/robots.ts`, `app/layout.tsx`, `next.config.ts`, `proxy.ts`
- **Why:** robots, metadata and status codes are identical in every environment. A public preview URL (e.g. `*.vercel.app` or a staging subdomain) would be crawlable, and its content would duplicate production.
- **Fix:** add an env flag (`SITE_ENV=production|staging`). When it isn't production: send an `X-Robots-Tag: noindex, nofollow` header on all responses (`next.config.ts` `headers()`), set `robots: { index: false }` in root metadata, and have `robots.ts` return `Disallow: /`. Also put HTTP Basic Auth or platform password protection on staging. robots.txt alone doesn't de-index pages that are already discovered.
- **Verify:** `curl -I` on staging shows `X-Robots-Tag`; on prod it does not; a QA test asserts no `noindex` on prod sitemap URLs.

### C4. Placeholder or unverified content would ship as if real
- **Files:** `lib/landing/content.ts`, `lib/pricing/content.ts`, `lib/blog/content.ts`, `lib/blog/articles.ts`, `lib/site.ts`
- **Evidence (from the source `TODO(content)` markers):**
  - Testimonial `name: "Customer Name", role: "Gym Name"`; another quote attributed to "Abhishek Koirala, **Udaan Fitness**" (looks internal). These differ from the four named testimonials on the live site.
  - Stats `100+` businesses, `10K+` members, **`+40%` "increase in your gym revenue"** (unverified outcome claim). The live site says "1000+ gyms" and the pricing page says "Trusted by more than 100 companies".
  - Pricing: **three identical placeholder plans**, all `Rs 14,999`. The live site has real tiers 14,999 / 19,999 / 24,999 with different limits.
  - Blog: every listing post is placeholder copy, with authors including the testimonial names and **future dates** (Nov 18 and Nov 28, 2026). The single article is placeholder copy.
  - Footer: template links (Changelog → `#insights`, Careers → `#contact`, Security → `#faq`, "Status: All systems operational").
  - Socials: `x.com`, `github.com`, `linkedin.com`, `youtube.com`. The real accounts are TikTok, Instagram and Facebook.
  - Hero eyebrow "Nepal's #1 Gym Software" is an unverified superlative.
- **Why:** this is misleading content and hurts trust/E-E-A-T. Pricing shown in the HTML would contradict any `Offer` markup, and a wrong price is a commercial risk too.
- **Fix:** content sign-off pass. Replace or remove each item (see the open questions in 03 §9). Mechanically, socials and `sameAs` come from a single `SITE.socials`.
- **Verify:** a CI grep finds no `TODO(content)` in `lib/` at launch, and the business confirms every claim.

### C5. Live URL `/plans` returns 404, and the app routes return 404
Covered in **03 §2–3** (migration plan). Listed here because, as of this build, deploying it to `www.gymudaan.com` would break the SaaS app (`/auth`, `/tenant/*`, `/checkins/*`, `/oauth2/redirect`, …) and drop the second-most-important indexed URL.

---

## 2. High

### H1. Titles and descriptions lose the Nepal and gym-software search intent
| Page | Live title | New title |
|---|---|---|
| `/` | Best Gym Software in Nepal \| GymUdaan … | **Gym Udaan: Smarter gym management. Stronger fitness businesses.** |
| `/plans` → `/pricing` | Gym Software Price in Nepal \| GymUdaan Plans | **Pricing \| Gym Udaan** |
| `/blogs` | — | Blogs \| Gym Udaan |
| `/privacy-policy` | Privacy Policy \| GymUdaan | Privacy & Policy \| Gym Udaan |
| `/terms` | Terms of Service \| GymUdaan | Terms & Conditions \| Gym Udaan |

The homepage description keeps "in Nepal" but drops the feature terms. `/pricing`'s description ("Flexible plans designed to simplify gym management…") has no price and no locale.
- **Fix:** write per-page titles and descriptions in a central `lib/seo/pages.ts`, using natural intent phrases ("Gym Management Software in Nepal", "Gym Software Pricing in Nepal (NPR)"). Final copy goes in doc 04 for sign-off.

### H2. Open Graph/Twitter tags are not page-specific
- **Evidence:** `/pricing`, `/blogs`, `/privacy-policy`, `/terms` all emit the **homepage** `og:title`/`og:description`/`twitter:*`. Next.js merges `openGraph` shallowly, so a page that sets only `title`/`description` inherits the root `openGraph` object whole. The blog article sets `openGraph` but inherits the homepage's `twitter:*`. **No page has `og:url`.** `og:locale` is `en_US` (live: `en_NP`).
- **Fix:** the C1 helper generates `openGraph` + `twitter` from the same per-page inputs.

### H3. FAQ answers are not in the server HTML, but they are in FAQPage JSON-LD
- **Files:** `components/landing/sections/FaqAccordion.tsx`
- **Evidence:** 4 of 5 answers are absent from the home HTML (Radix `Accordion.Content` unmounts closed panels). All 5 are in the FAQPage JSON-LD.
- **Why:** structured data must describe content visible on the page. The answers are also useful indexable text.
- **Fix (no visual change):** `forceMount` on `Accordion.Content` with `data-[state=closed]:hidden` (or `hidden="until-found"`), keeping the current animation. Note: Google has limited FAQ rich results to authoritative government/health sites since 2023. The markup is harmless but isn't expected to produce rich results.
- **Verify:** `curl /` contains every answer string.

### H4. Hero video weight and LCP
- **Files:** `components/landing/primitives/AutoplayVideo.tsx`, `components/landing/sections/HeroVideo.tsx`, `components/landing/sections/ClientLogoList.tsx`, `public/video/*`
- **Evidence:** `gym-udaan-final.mp4` is **8.3 MB** and served to every device. `autoPlay` overrides `preload="metadata"`, so it downloads in full. There is one MP4 source: no WebM/AV1, no mobile rendition. `testimonial-1.mp4` (3.3 MB) also autoplays on `/` and `/blogs`. The page preloads **16 client-logo images** (`loading="eager"`, which becomes `<link rel=preload>`) that compete with the hero. The likely LCP element (hero video poster/headline) isn't prioritised.
- **Fix (keeps the design):** see doc 05. In short: re-encode (≈1.5–2.5 MB H.264 720p + AV1/WebM via `<source>`), add a mobile rendition or use poster-only on `save-data`/slow connections, start loading after first paint, preload the poster, set the client logos to lazy, and make the testimonial video load on visibility.
- **Verify:** Lighthouse mobile (lab) + PageSpeed field data after launch; the network panel shows < 3 MB on first view.

### H5. Analytics and conversion tracking absent
- The live site runs GA4 `G-MRY1JZCLXM`; the new app has no analytics. Launching without it loses the before/after comparison and lead attribution (WhatsApp clicks, onboarding starts).
- **Fix:** `@next/third-parties/google` `GoogleAnalytics` (new dependency; official, deferred loading) or a plain `next/script` with `afterInteractive`. Add events for WhatsApp, "Get Started" and "Request a demo" clicks. Use the same GA4 property so trends stay continuous.

### H6. Legal page regressions
- **Privacy:** the text says "contact information provided below", but the new page has **no Contact section** and **no "Last Updated" date**. The live page has both, plus a "Consent" section. Meta and TikTok app reviews commonly check the Privacy Policy URL for contact and data-deletion information.
- **Titles:** "Privacy & Policy" / "Terms & Conditions" vs the live "Privacy Policy" / "Terms of Service".
- **Fix:** content alignment with the live legal text (business/legal sign-off). Keep the URLs unchanged.

### H7. Unknown blog slugs are soft 404s
- **Evidence:** `/blogs/nope` returns **200** with `<meta name="robots" content="noindex">`. Under PPR the shell streams before `notFound()` runs. `dynamicParams = false` is **not available** with `cacheComponents` (Next 16 docs).
- **Fix options (to be verified):** in `proxy.ts`, match `/blogs/:slug` and rewrite unknown slugs to the not-found page with `status: 404`; or resolve the slug before any Suspense boundary. Pick the option that a test proves returns a real 404.

---

## 3. Medium

| # | Issue | Files | Fix |
|---|---|---|---|
| M1 | Structured data is thin: `SoftwareApplication` has no `url`/`offers`/`publisher`; no `Organization`, `WebSite`, `BreadcrumbList`, or `BlogPosting` for the article | `app/(marketing)/page.tsx`, blog article | `lib/seo/json-ld.ts` builders. Use only real facts (name, URL, logo, contact, real socials, real prices). **Don't** port the live `aggregateRating` |
| M2 | H1 text appears twice in the DOM (short + long variant, one `display:none`) → crawlers read "The all-in-one gym management platform The gym management platform for modern fitness businesses" | `components/landing/sections/Hero.tsx` | Keep one text in the H1 and do the phone/desktop difference with CSS, or mark the duplicate `aria-hidden` and move it outside the H1. Visual output unchanged |
| M3 | H1 has neither "Nepal" nor "software"; the only Nepal mention near the top is the eyebrow claim "Nepal's #1" | `lib/landing/content.ts` | Copy decision (doc 04). Don't stuff keywords |
| M4 | Brand spelling differs: "Gym Udaan" (new) vs "GymUdaan" (live, logo alt, JSON-LD, socials, App Store) | `lib/site.ts` | Choose one display name. Use `alternateName` in JSON-LD for the other |
| M5 | Generic or misleading internal link labels: footer labels point to unrelated anchors, all four "Insights" cards link to `/blogs`, and "Login" goes to `/onboarding` (TODO) instead of the real app login | `lib/landing/content.ts`, `lib/site.ts` | Real destinations only. Remove links that have none |
| M6 | Nepal differentiators missing from the copy: BS dates, eSewa/Khalti, SMS reminders, biometric/door access, app store links | content | Restore from the live site (01 §7, C2/C10) after confirming they are current |
| M7 | Duplicate `<title>` on 404 pages (root default + inline `Page not found`) | `app/not-found.tsx` | Harmless for a 404. Optionally move to `global-not-found` metadata |
| M8 | Sitemap has no `lastmod` | `app/sitemap.ts` | Add `lastmod` only for blog posts, from the article's real updated date. Leave it off static pages unless there's a tracked content date |

## 4. Low

| # | Issue | Note |
|---|---|---|
| L1 | Home JS: 20 chunks, ≈278 KB transferred under `next start` | Acceptable for this design. Use `next experimental-analyze` to check whether `radix-ui` barrel imports, `nextjs-toploader` or `ThemeProvider` can be trimmed from marketing routes |
| L2 | `nextjs-toploader` and the theme provider run on marketing pages, which use a fixed palette | Small hydration cost |
| L3 | `robots.ts` doesn't list the live app paths | Only matters if the app stays on this host. The proxy/rewrite plan decides this |
| L4 | `twitter:site` not set | Add only if a real X account exists (none known) |

## 5. Not verified yet (needs a browser or field data)

- Real LCP/CLS/INP (no Lighthouse run yet; doc 05 sets the plan).
- Colour contrast of `text-white/70` footer links and `opacity-80` body text on dark bands.
- Keyboard order and focus visibility in `LandingMobileNav`.
- How Cloudflare merges its managed robots.txt with the app's `robots.ts`.
