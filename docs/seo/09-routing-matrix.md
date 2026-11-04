# 09 — Routing & Conflict Matrix (marketing site ↔ live app on www.gymudaan.com)

- **Date:** 2026-11-04. **Evidence:** the live production bundle's route table, read-only HTTP probes of www.gymudaan.com, this repo's build route table.
- **Status:** analysis only. **No DNS, Cloudflare, hosting or app change has been made.** Choosing and configuring the architecture is a platform-owner decision (launch gate L1-arch, below).

## 1. Who owns which path today (verified)

The live app's top-level React Router routes (bundle `path:"/…"`): `/` (marketing root, children `plans`, `privacy-policy`, `terms`), `/auth`, `/getting-started`, `/oauth2/redirect`, `/oauth2/error`, `/unauthorized`, `/tenant/*`, `/super/*`, `/affiliate/*`, `/checkins/:businessName`, `/workout/:businessName`. Everything else returns the SPA shell with **200** (soft-404). Static: `/assets/*`, `/favicon*.png|ico`, `/apple-touch-icon.png`, `/real-gymudaanlogo.jpeg`. API: `https://gym-mobile-backend-api.gymudaan.com` (separate host, requests sent `withCredentials`).

This repo's routes (build): `/`, `/plans`, `/privacy-policy`, `/terms`, `/blogs`, `/blogs/[slug]`, `/onboarding`, `/login` (added in parallel work), `/dashboard*`, `/admin*`, `/account*` (starter app surfaces), `/robots.txt`, `/sitemap.xml`, `/opengraph-image.jpg`, `/twitter-image.jpg`, `/apple-icon.jpg`, `/favicon.ico`, `/_next/*`, `/video/*`, `/landing/*` (public assets), `/pricing` (308 → `/plans`).

## 2. Routing matrix (path-based option)

| Path | Live owner today | Proposed owner | Conflict? | Notes |
|---|---|---|---|---|
| `/` | marketing (SPA) | **marketing (Next)** | no | Same URL, same intent |
| `/plans` | marketing (SPA) | **marketing (Next)** | no | Kept as canonical pricing URL (Phase 9) |
| `/pricing` | soft-404 (SPA 200) | marketing: 308 → `/plans` | no | Not a live route |
| `/privacy-policy`, `/terms` | marketing (SPA) | **marketing (Next)** | no | URLs likely registered with Meta/TikTok/app stores: keep exact |
| `/blogs`, `/blogs/*` | soft-404 | marketing | no | 404 in production until an article is published |
| `/onboarding`, `/login` | soft-404 | marketing | **check** | `/login` is new: confirm it shouldn't be the live app's `/auth` |
| `/robots.txt`, `/sitemap.xml` | Cloudflare-merged + SPA origin | marketing | **merge** | Next's file carries the live app disallows; Cloudflare's managed AI-bot block is prepended at the edge: verify the merged output on staging |
| `/_next/*` | 404 | marketing | no | No collision with the app's `/assets/*` |
| `/_next/image` | 404 | marketing | no | Image optimizer must reach the Next origin |
| `/video/*`, `/landing/*` | soft-404 / none | marketing | no | Public assets of this repo |
| `/opengraph-image.jpg`, `/twitter-image.jpg`, `/apple-icon.jpg` | 404 | marketing | no | |
| `/favicon.ico` | app (SPA static) | **either** | **yes (same path)** | Pick one origin; serve the same icon |
| `/favicon-16/32/48/96.png`, `/apple-touch-icon.png`, `/real-gymudaanlogo.jpeg` | app static | app | no | Old OG shares reference the JPEG: keep on app origin |
| `/assets/*` | app bundles | **app** | no | Must stay on the app origin |
| `/auth`, `/getting-started`, `/unauthorized` | app | **app** | no | |
| `/oauth2/redirect`, `/oauth2/error` | app | **app** | no | OAuth callbacks: never redirect or rewrite |
| `/tenant/*`, `/super/*`, `/affiliate/*` | app | **app** | no | |
| `/checkins/:business`, `/workout/:business` | app (public, QR) | **app** | no | Printed QR codes point here |
| `/dashboard*`, `/admin*`, `/account*` | soft-404 (robots blocks `/admin/`) | **decide** | **name clash risk** | These are this starter's app surfaces. If they ship, they share the domain with the live app's auth; otherwise route them nowhere |
| `/api/*` | soft-404 (disallowed in robots) | app/none | no | Live robots.txt disallows `/api/` |
| anything else | soft-404 (SPA 200) | marketing → **real 404** | intended change | Fixes the soft-404 problem |

## 3. Cookies & sessions

- The live app authenticates against `gym-mobile-backend-api.gymudaan.com` with `withCredentials` requests; the auth cookie names/domains are set by that API and are **not visible without logging in** (unverified).
- This repo's proxy treats the presence of an `access_token` cookie as "maybe signed in" for `/dashboard`, `/admin`, `/account`. **If the API sets `access_token` on `.gymudaan.com`, the two would collide.** App team must confirm the cookie names and domain before path routing.
- The live app writes one UI cookie from the browser (sidebar state, `path=/`); shadcn's sidebar in this repo uses the same pattern. Harmless but confirm the name to avoid cross-talk.

## 4. Architecture options & SEO implications

| Option | How | SEO effect | Risk | Recommendation |
|---|---|---|---|---|
| **A. Path-based edge routing on www** | Cloudflare Worker/Origin Rules send the marketing paths (§2) to Next, everything else to the SPA origin | **None**: every indexed URL keeps its address and host | Allow-list must be exact; robots/favicons/cookies (§3) need care | **Preferred for launch**, given the matrix shows no route conflicts |
| B. Next.js `rewrites` fallback to the SPA origin | Unmatched paths proxied by the Next server | None | All app traffic passes through Next (latency, single point of failure); harder 404 semantics | Not recommended |
| C. App moves to `app.gymudaan.com` | 301 app paths from www → app | Low (app pages aren't search assets) | OAuth redirect URIs, Meta/TikTok config, bookmarks and **printed `/checkins` QR codes** all change | Good long-term, **not as part of the launch** |
| D. Marketing on a subdomain | e.g. `site.gymudaan.com` | **High**: moves every indexed URL off the established host | — | **Not recommended** |

## 5. Pre-cutover verification (on a staging host behind the same Cloudflare zone)

1. Every row of §2 returns the expected owner and status (script the table; real requests).
2. `/oauth2/redirect?code=test` reaches the app untouched (no redirect, query preserved).
3. A logged-in app session survives a round trip through marketing pages (cookie names, §3).
4. Merged `robots.txt` = Cloudflare managed block + this repo's rules; `Sitemap:` line points to www.
5. `/_next/image?url=…` returns images (optimizer reachable).
6. `/checkins/<real-gym>` works from a phone (QR flow).

## 6. Rollback

Path routing is reverted by restoring the Cloudflare rule to send everything to the SPA origin (minutes, no DNS change). Keep the SPA origin deployed, unchanged, for ≥ 30 days after cutover.
