# 01 — Existing Website SEO Audit (www.gymudaan.com)

- **Audit date:** 2026-11-03
- **Method:** public inspection only (`curl` for raw HTTP, headless Chromium `--dump-dom` for rendered HTML, the production JS bundle `/assets/index-RtakWmfk.js` for the route table and SEO component).
- **Not available:** Google Search Console, GA4, Bing Webmaster Tools, backlink tools, server logs.

> **Limitation (read first):** without Search Console, nothing below says how much organic traffic, how many impressions, which queries, or which pages are actually indexed. Those numbers **cannot be determined from public inspection**, and this audit does not estimate them. Getting Search Console access is the first pre-migration action (see 03).

---

## 1. Platform and hosting (verified)

| Item | Finding | Evidence |
|---|---|---|
| Stack | Vite + React SPA (client-side rendered), `react-helmet-async` for per-route head tags | Raw HTML is a 3.9 KB shell with `<div id="root"></div>`; bundle contains `HelmetProvider` and an `F3` SEO component |
| CDN | Cloudflare (`server: cloudflare`, `cf-cache-status: DYNAMIC`, `Cache-Control: no-cache`) | Response headers |
| Analytics | GA4 `G-MRY1JZCLXM` (gtag in the HTML shell) | Raw HTML |
| **Same domain hosts the SaaS app** | The marketing site and the gym-management application are **one SPA on the same host** | Route table in bundle (see §3) and robots.txt disallowing `/auth/`, `/super/`, `/admin/`, `/getting-started`, `/api/` |

## 2. Hostname, protocol, status codes (verified)

| Request | Result |
|---|---|
| `https://www.gymudaan.com/` | **200** (canonical host) |
| `https://gymudaan.com/` | 301 → `https://www.gymudaan.com/` |
| `http://www.gymudaan.com/` | 301 → `https://www.gymudaan.com/` |
| `http://gymudaan.com/` | 301 → `https://www.gymudaan.com/` (single hop) |
| `/robots.txt`, `/sitemap.xml` | 200 |
| `/plans`, `/privacy-policy`, `/terms` | 200 |
| `/pricing`, `/blogs`, `/blog` | **200, but these are not real pages.** The SPA shell is returned for every path |
| `/this-page-does-not-exist-xyz` | **200** with HTML byte-identical to the homepage; renders a client-side "404 Page Not Found" |

**Conclusion:** the preferred canonical host is **`https://www.gymudaan.com`** (HTTPS + `www`), and apex/HTTP redirects are clean single 301s. The site has a **soft-404 problem**: every unknown URL returns 200.

## 3. URL inventory

### 3a. Public marketing routes (from bundle: `path:"/"` children)

| URL | In sitemap | Rendered title | Canonical (rendered) |
|---|---|---|---|
| `/` | yes | `Best Gym Software in Nepal \| GymUdaan - Automate Your Fitness Business \| GymUdaan - Nepal's #1 Gym Management Software` (≈118 chars, brand duplicated) | `https://www.gymudaan.com` |
| `/plans` | yes | `Gym Software Price in Nepal \| GymUdaan Plans` | `https://www.gymudaan.com/plans` |
| `/privacy-policy` | yes | `Privacy Policy \| GymUdaan` | `https://www.gymudaan.com/privacy-policy` |
| `/terms` | yes | `Terms of Service \| GymUdaan` | `https://www.gymudaan.com/terms` |

The live site has **no blog, no feature pages, no about/contact pages.** The footer's "Features / Pricing / About Us / Contact" links point to `#` or in-page anchors.

### 3b. Application routes on the same host (must not break)

From the bundle's route table: `/auth`, `/getting-started`, `/oauth2/redirect`, `/oauth2/error`, `/unauthorized`, `/tenant/*` (gym-owner dashboard, ~150 child routes), `/super/*` (super-admin), `/affiliate/*`, and **public, tenant-specific pages `/checkins/:businessName` and `/workout/:businessName`** (likely QR check-in / workout pages used by gym members).

These are not SEO assets, but **gyms and members use them every day**. `/oauth2/redirect` is almost certainly registered as an OAuth callback URL with Google/Meta/TikTok. Pointing `www.gymudaan.com` at the new Next.js app would 404 all of them unless routing is split (see 03 §2). **This is the single largest migration risk, and it isn't an SEO risk.**

### 3c. Sitemap (`/sitemap.xml`, verified)

Four URLs: `/`, `/plans`, `/privacy-policy`, `/terms`. It has `changefreq`/`priority` and no `lastmod`. It's consistent with the routes.

### 3d. robots.txt (verified)

- Cloudflare-managed block: blocks AI-training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot, …), adds `Content-Signal: search=yes,ai-train=no`, and also **blocks `GoogleOther`, `Baiduspider` and `PetalBot`**.
- Origin block: `Allow: /`, `Disallow: /auth/ /getting-started /super/ /admin/ /api/`, plus a `Sitemap:` line.
- Googlebot (search) is **allowed**. CSS/JS are not blocked.
- **Note:** this file is merged/served at the Cloudflare edge. Whatever the new app's `robots.ts` produces, Cloudflare's managed section is likely prepended. Check this on staging behind the same zone.

## 4. Metadata findings (rendered DOM)

| Issue | Severity | Detail |
|---|---|---|
| **Duplicate head tags** | Medium | The static shell hardcodes `description`, `keywords`, `og:*`, `twitter:*`. Helmet then adds a **second** set, so every page has two `<meta name="description">`, two `og:title`, etc. Google may pick either. |
| Homepage title too long, brand twice | Medium | ≈118 chars; truncated in SERPs. |
| Canonical relies on JS | Medium | Canonical exists only after hydration (Helmet). The raw HTML has no canonical. Googlebot renders JS, but it's a second-wave dependency. |
| Canonical default = `window.location.href` | Low | Pages without an explicit `url` canonicalize to the URL as visited, **query strings included**. |
| `og:image` relative (`/real-gymudaanlogo.jpeg`) in the static shell | Low | Relative OG URLs are unreliable for scrapers; Helmet's copy is also relative. |
| `meta keywords` | Info | Ignored by Google; harmless. |
| Geo meta (`geo.region=NP`, `ICBM`) | Info | Not used by Google; harmless. |
| `html lang="en"` | OK | |
| `og:locale="en_NP"`, alternate `ne_NP` | Info | No Nepali content exists, so the `ne_NP` alternate is unfounded. |

## 5. Structured data (rendered DOM)

| Page | Types | Concerns |
|---|---|---|
| `/` | `SoftwareApplication`, `Organization`, `FAQPage` | **`aggregateRating` 4.9 / 89 ratings** with no visible review source. The page's visible copy says "5/5 based on 500+ reviews", which contradicts it. Self-declared ratings that aren't backed by visible, verifiable reviews violate Google's review-snippet guidelines and risk a manual action. `offers.price: "0"` contradicts `/plans` (NPR 14,999+). `serviceArea` lists 10 cities. |
| `/plans` | `SoftwareApplication` with 3 `Offer`s, `BreadcrumbList` | Prices match visible prices (good). |
| `/privacy-policy`, `/terms` | `BreadcrumbList` | OK |

`Organization` gives contact `+977-9705001112`, `sales@gymudaan.com`, locality **Itahari**, and `sameAs` TikTok/Instagram/Facebook. These are real, reusable facts.

## 6. Headings and content (rendered DOM)

- **Homepage has four `<h1>`s** ("GymUdaan Nepal's #1 Gym Software", "Why Are Gyms Switching…", "Everything You Need To Run Your Gym", "Everything You Need to Know"). The client-logo marquee repeats 15 `<h3>` gym names **4×** (60 h3s).
- `/plans`: one H1 ("Simple, transparent pricing."), plan names as H2. Keyword-relevant copy is thin.
- Legal pages: clean H1/H2/H3 outlines.
- Internal links: header `/`, `/plans`, `/auth`; footer `/privacy-policy`, `/terms`. **No crawlable link to any feature content** (there are no such pages).
- Images: 75 on home, all with alt text. Logos are WebP. No `<video>`.

## 7. Content preservation inventory

Content with plausible search value or business value that the new site should keep (in substance, not necessarily verbatim):

| # | Content (live) | Why keep it | Present in new site? |
|---|---|---|---|
| C1 | Positioning: "gym management software in Nepal", city mentions (Kathmandu, Pokhara, Butwal, Chitwan, Biratnagar, Itahari, Dharan) | Only Nepal-intent copy on the site; matches likely queries | **Weak.** One "in Nepal" in the description; no city context |
| C2 | Nepal-specific differentiators: **Nepali (BS) dates, eSewa & Khalti, SMS renewal reminders, biometric/fingerprint & door access** | Genuine product differentiators and long-tail terms | **Missing.** A grep of `lib/` finds no BS/Bikram Sambat, eSewa, Khalti, biometric or fingerprint mention |
| C3 | Feature set: membership, attendance, inventory/products, payments, plans, revenue reports, cafe POS, staff payroll, diet plans, multi-branch (up to 5) | Feature-intent terms | Partially (member, attendance, payments, reports, daybook, social automation) |
| C4 | **Real pricing**: Standard NPR 14,999/yr (800 members, 100 SMS), Gold 19,999 (unlimited, 500 SMS), Platinum 24,999 (800 SMS), feature inclusion list | Commercial intent ("gym software price Nepal"); matches structured data | **No.** New site shows three identical placeholder cards at "Rs 14,999" |
| C5 | Comparison table (Register/Excel vs other software vs GymUdaan) | Useful decision content | Yes (different rows; verify) |
| C6 | 4-step onboarding copy | Supports "how it works" | Yes (reworded) |
| C7 | FAQ: BS dates, switching from Excel, biometric/door access, multi-branch & staff, mobile app & data safety | Real objections; long-tail | **Different questions.** Live FAQs are richer and more specific |
| C8 | Named testimonials (Lekh Gurung — Narmaya Fitness Pokhara; Dipesh Gautam — Freestyle Fitness Biratnagar; Bhagendra — Basic Gym Urlabari; Mahesh Maharjan — Body Armor Kathmandu) | Real-looking trust signals | **Different people** in the new site, including a placeholder "Customer Name / Gym Name" |
| C9 | 15 client gym logos with city | Trust signals | Yes (same 15 logos) |
| C10 | App store links (Google Play search URL; App Store id6757342570) | Real distribution | **Missing.** No Play/App Store link anywhere in `lib/` |
| C11 | Real socials: TikTok `@gymudaan`, Instagram `gymudaannepal`, Facebook page id 61590425726116 | `sameAs`, trust | **No.** New footer links to `x.com`, `github.com`, `linkedin.com`, `youtube.com` placeholders |
| C12 | Contact: WhatsApp +977-9705001112, sales@gymudaan.com, Itahari | NAP consistency | Yes |
| C13 | Legal pages incl. Meta/TikTok platform sections | Likely referenced by Meta/TikTok app review as the Privacy Policy / ToS URLs | Yes, same URLs `/privacy-policy`, `/terms`. **Keep the URLs exactly.** |

### Claims on the live site needing verification before reuse

These are **not** to be copied into the new site until the business confirms them: "Nepal's #1", "best gym software in Nepal", "1000+ gyms", "4,000+ members", "100% satisfaction", "5/5 based on 500+ reviews", JSON-LD rating 4.9/89, per-gym member counts (500+, 300+ …). They contradict each other (e.g. 1000+ gyms vs 15 shown; 500+ reviews vs 89).

## 8. Recommended actions (pre-migration)

1. **Get Search Console access** for `https://www.gymudaan.com` (Domain property preferred). Export 16 months of Performance (queries, pages, countries, devices), the Pages/indexing report, Sitemaps status, Core Web Vitals and Links. This is the baseline. Without it, migration impact can't be measured.
2. Export GA4 organic landing-page traffic and the conversion events (WhatsApp clicks, sign-ups).
3. Confirm with the app team how `/auth`, `/tenant`, `/super`, `/affiliate`, `/checkins/*`, `/workout/*`, `/oauth2/*`, `/getting-started` will be served after the switch (see 03 §2).
4. Confirm which marketing claims are true (list in §7).
5. Record whether `/plans` has impressions/clicks or backlinks (GSC → Links). This decides keep-vs-redirect.
