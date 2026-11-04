# 04 — Keyword & Content Architecture

- **Date:** 2026-11-04. **No search-volume, difficulty or ranking data is available** (no Search Console, no keyword tool). Every keyword below is a *candidate* inferred from query wording and the live site's own targeting; validate with Search Console (queries/impressions for www.gymudaan.com) before prioritising.
- Labels: **[live]** = implemented in this repo · **[proposed]** = needs approval · **[business]** = needs facts from the owner.

## 1. Identity chain

**Gym Udaan → gym management software → memberships, attendance, payments/billing, reports and daily operations → gyms and fitness centers → Nepal.**

Where it appears today [live]: homepage `<title>` "Gym Management Software in Nepal | Gym Udaan"; eyebrow "Built for gyms and fitness centers in Nepal"; H1 "The gym management software for modern fitness businesses"; hero description "Run memberships, attendance and payments from one platform."; Organization/WebSite/SoftwareApplication JSON-LD (`/#organization`, `/#website`, `/#software`).

## 2. Keyword → page map (one owner per intent; no duplicates, no city pages)

| Page | Primary intent | Primary keyword (candidate) | Supporting topics | Audience | Conversion |
|---|---|---|---|---|---|
| `/` [live] | Commercial: find gym software | gym management software Nepal | gym software Nepal, gym management system Nepal, fitness center management software, gym management app | Gym/studio owners and managers in Nepal | WhatsApp demo, Get Started |
| `/plans` [live] | Commercial: price | gym management software pricing (Nepal) | gym software price Nepal, NPR plans, what each plan includes | Owners comparing cost | Contact for plan, Get Started |
| `/features` [proposed] | Commercial: capabilities overview | gym management software features | membership, attendance, billing, reports, staff, member app | Owners evaluating fit | Demo |
| `/features/membership-management` [proposed][business] | Feature | gym membership management software | plans, renewals, reminders, member profiles, BS dates* | Owners with growing member lists | Demo |
| `/features/attendance` [proposed][business] | Feature | gym attendance management software | biometric/fingerprint*, QR check-in, staff attendance | Owners replacing registers | Demo |
| `/features/billing-payments` [proposed][business] | Feature | gym billing software Nepal | dues, receipts, day book, day-end closing, local payment options* | Owners managing cash/finance | Demo |
| `/features/reports` [proposed][business] | Feature | gym reports and analytics software | membership, attendance, sales, expense reports | Owners making decisions | Demo |
| `/about` [proposed][business] | Navigational/trust | Gym Udaan (brand) | company, team, Itahari, contact | Prospects checking legitimacy | Contact |
| `/blogs/*` [gated] | Informational | e.g. how to manage a gym in Nepal | renewals, retention, running costs | Owners researching | Soft CTA to features/demo |
| `/terms`, `/privacy-policy` [live] | Navigational/legal | — | — | Users, platform reviewers | — |

\* Only after the owner confirms the capability is current (the live app's route table shows biometrics, QR check-in, finance/day book modules exist; see docs/seo/08 §5a).

**"Best gym management software in Nepal":** not used as a claim anywhere. The homepage targets the intent with specifics (Nepal-built, workflows, transparent pricing), not a superlative. A comparison page is only worth creating with fair, verifiable content.

**No city pages.** Nepal relevance comes from genuine content: local workflows (BS dates, local payments, SMS reminders, *once confirmed*), NPR pricing, local support and a real address (Itahari).

## 3. Page content requirements

| Page | Required content | Status |
|---|---|---|
| `/` | One clear H1 (done); Nepal context (eyebrow done; differentiators **[business]**); verified feature sections (existing); honest trust signals: testimonials/stats only when approved (gated); FAQ visible in HTML (done) | Partially live |
| `/plans` | Real NPR tiers and inclusions **[business]**: today three identical placeholder cards; calculator figures to confirm | Blocked |
| Feature pages | What it does · who benefits · problem solved · how it works · real screenshots · workflow · FAQ · related features · demo CTA. Minimum ~400 words of genuinely specific content each, or don't publish | Proposed |
| `/about` | Company (operator Udaan Tech Solution Pvt. Ltd.), location, team (optional), contact, support hours **[business]** | Proposed |
| Blog | Real articles with real authors/dates, linking to feature pages; publish by setting `published: true` in `lib/blog/registry.ts` | Gated |

## 4. Internal linking plan

- Header: Home · Pricing [live]; add Features (hub) and Blog when they exist (blog link appears automatically once an article is published).
- Footer [live]: Product (core features, more features, who it's for, how it works, pricing) · Resources (FAQ, Blog when public) · Company (WhatsApp contact, get started) · Legal (Terms, **Privacy**: newly linked).
- Homepage feature sections → matching feature pages with descriptive anchors (when built); feature pages ↔ related features → pricing → demo.
- Enforced by the QA suite: every internal link resolves and every `#anchor` exists (docs/seo/06).

## 5. Validating the keywords after launch

Search Console → Performance → filter Country = Nepal: compare queries containing "gym software", "gym management", "attendance", "membership", "billing", "price" before vs after; map each query to the page that ranks; fix cannibalisation (two pages ranking for one query) by consolidating, not by adding pages.
