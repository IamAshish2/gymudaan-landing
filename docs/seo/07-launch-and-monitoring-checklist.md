# 07 — Launch & Monitoring Checklist

Nothing here has been executed. Launch is **blocked** until every "Before launch" item is ticked. Owner per line in brackets.

## Before launch

**Business information** (docs/seo/08 §13) [owner]
- [ ] Search Console access (Domain property) + 16-month Performance export, Pages report, Links export (baseline)
- [ ] GA4 property confirmed (`G-MRY1JZCLXM` on the live site?) and access granted
- [ ] Pricing tiers confirmed → replace the placeholder cards; calculator figures confirmed
- [ ] Testimonials approved (set `approved: true` per tile in `lib/landing/content.ts`) or left hidden
- [ ] Stats figures approved (`stats.approved`) or left hidden
- [ ] Client logos: permission for all 15
- [ ] Socials confirmed (`lib/site.ts`); legal name/operator confirmed
- [ ] Privacy policy: contact section, "Last Updated", data-deletion text (legal sign-off)
- [ ] Decision: hero entrance animation (docs/seo/05 §3.1) and brand-button contrast (docs/seo/06 §4)

**Platform / app team**
- [ ] Architecture chosen (docs/seo/09 §4) and the routing allow-list implemented on a **staging** host [platform]
- [ ] Auth cookie names/domains confirmed; no `access_token` clash (docs/seo/09 §3) [app team]
- [ ] App routes send `X-Robots-Tag: noindex`; unknown `/checkins/*`, `/workout/*` return 404 (docs/seo/03 L5) [app team]
- [ ] Every pipeline sets `SITE_ENV` + `NEXT_PUBLIC_SITE_URL` (docs/seo/03 §12) [platform]
- [ ] Staging/preview access protection on (Vercel Deployment Protection / Cloudflare Access / basic auth at the proxy) [platform]
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` set for production only (once confirmed) [platform]

**Staging validation** [engineering]
- [ ] `npm run test:seo` against the staging host (`SEO_EXPECT=staging`) passes
- [ ] Routing matrix §5 checks pass (OAuth callback, QR check-in, logged-in session, merged robots.txt, `/_next/image`)
- [ ] Lighthouse mobile/desktop on staging (real network) recorded
- [ ] Visual review of `/`, `/plans`, legal pages at 390 / 1440

## Launch day (only with explicit approval) [platform + engineering]

1. Deploy the production build (`SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://www.gymudaan.com`).
2. Switch routing in a low-traffic window; keep the SPA origin running.
3. Immediately: `SEO_BASE_URL=https://www.gymudaan.com SEO_EXPECT=production npm run test:seo` (read-only requests); spot-check 10 app URLs (login, tenant dashboard, a real QR check-in, OAuth).
4. Search Console: submit `https://www.gymudaan.com/sitemap.xml`; URL Inspection on `/` and `/plans`.
5. GA4 Realtime: one `page_view` per page load and per navigation (no doubles); click WhatsApp → `whatsapp_click` event.

**Rollback trigger:** any app route failing, site-wide `noindex`/`Disallow`, wrong canonicals, 5xx above normal → restore the routing rule to send all traffic to the SPA origin (minutes, no DNS change).

## After launch: monitoring

| When | Check | Source |
|---|---|---|
| Daily, week 1 | Pages indexed vs excluded; crawl errors; unexpected 404s/5xx | Search Console → Pages; server logs |
| Weekly, weeks 1–8 | Clicks/impressions/avg position vs baseline (Country = Nepal); queries per page (cannibalisation) | Search Console → Performance |
| Weekly | Leads: `whatsapp_click`, `get_started_click`, `email_click` | GA4 events |
| Monthly | Core Web Vitals (mobile p75), INP/LCP failing URLs | Search Console CWV / CrUX |
| Monthly | `npm run test:seo` against production | this repo |

Expect some ranking movement in the first weeks after any migration. Investigate a sustained drop page by page (compare with the baseline export) before attributing it to the redesign.
