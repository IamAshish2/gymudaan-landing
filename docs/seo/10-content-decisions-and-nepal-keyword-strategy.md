# 10 — Content Decisions, Pricing Comparison & Nepal Keyword Strategy

- **Date:** 2026-11-04. **Status: research and proposals only. Nothing implemented.** Each section ends with what needs your approval.

> **Update (2026-11-04, owner decision):** **Access Control is a current feature included in all plans** (as on the live /plans page), not "coming soon". §1 and §2.3 below are superseded on this point. **Implemented (uncommitted):** pricing = the live plans in NPR (§2.1), Access Control shown as included, calculator aligned to the live limits, `/plans` Offer JSON-LD, and the three P1 guides (#1, #2, #3) written as **unpublished drafts** for review (`lib/blog/guides.ts`). Still awaiting approval: hero fade (§7), Features copy (§6), testimonials gate (§5), monthly switch, "Membership Card" add-on.
- **Data limits (read first):** Google Keyword Planner (needs your Ads account) and Search Console (no access) were **not available**, so **no monthly search volumes, ranks or difficulty scores appear here**. Google Trends was not usable programmatically. Demand evidence = Google's own autocomplete queried for Nepal (`gl=np`, 2026-11-04): a suggestion appears only for queries with real, repeated search activity, so it proves demand *exists*, not *how much*. "No suggestion" means demand is too low to show, not zero. Competition evidence = web search results (a US-based search tool, not Google Nepal's SERP).

---

## 1. Updated business decisions

| Decision | Effect on the site |
|---|---|
| No separate feature pages | Feature intent is served by the existing "Our Features" (Services) and "Main Features" sections: copy-only improvements (§6) |
| Access Control = **coming soon**, no date | Must not appear as included anywhere: pricing cards, comparison matrix and calculator add-on need changes (§2.3); not in structured data (it isn't today) |
| No About page | Withdrawn. Trust info stays in existing sections (footer contact, legal pages, organization data) |
| Testimonials: keep the design, flag rather than remove | **Conflict to resolve:** the current code *hides* unapproved testimonials in production builds (gate added last round). See §5 |
| Pricing follows the live `/plans` plans, with `NPR` instead of `Rs` | Comparison below; awaiting approval |
| Blogs/guides are the main remaining SEO effort | §3–§4 |
| Hero LCP: investigate the smallest fix | §7 (measured) |

## 2. Live vs new pricing

Live page rendered 2026-11-04 (`https://www.gymudaan.com/plans`); its JSON-LD offers agree (Standard 14999, Gold 19999, Platinum 24999, NPR, annual).

### 2.1 Plans

| | Live | New site today | Proposed |
|---|---|---|---|
| Plan names | **STANDARD** (label "Starter"), **GOLD** (badge "Popular"), **PLATINUM** (badge "Best Value") | "Starter", "Gold" (popular), "Platinum" | Standard · Gold (Popular) · Platinum (Best Value). Keep "Starter" only as Standard's tagline if you like it |
| Taglines | "For small gyms getting started" / "Ideal for growing gym branches" / "Full-scale multi-branch management" | one placeholder sentence on all three | Live taglines |
| Price | **Rs 14,999 / 19,999 / 24,999** per year · billed annually | **"Rs 14,999" on all three** (placeholder) | **NPR 14,999 / NPR 19,999 / NPR 24,999** per year, billed annually |
| Billing switch | yearly only | Monthly/Yearly switch (stays on Yearly, no monthly prices exist) | Hide the Monthly option or keep the switch disabled: there are no monthly prices (decision) |
| Members | Up to 800 / Unlimited / Unlimited | "Up to 800" on all cards; matrix correct | Live values |
| Message credits | 100 / 500 / 800 | "100" on all cards; matrix correct | Live values |

### 2.2 Features (live cards) vs new matrix

| Feature | Standard | Gold | Platinum | New matrix |
|---|---|---|---|---|
| Member Management, Finance, Attendance, Auto Reminder, Priority Support | ✓ | ✓ | ✓ | ✓ matches |
| Inventory Management, POS Billing, Advance(d) Analytics, Broadcast Messaging, Mobile App, Member Retention, Diet & Workout Plans, Credit Balance View, Chat Support | ✗ | ✓ | ✓ | ✓ matches |
| Multi Branch, Cafe Management | ✗ | ✗ | ✓ | ✓ matches |
| **Access Control** | ✓ (live says included) | ✓ | ✓ | ✓ (all three) → **must become "Coming soon"** |

The new matrix already mirrors the live split exactly; only the **cards** are placeholders.

### 2.3 Access Control: needed changes (proposal)

1. **Cards:** drop "Access Control" from "Includes"; optionally show a muted "Access control: coming soon" line below the list (not as a ✓).
2. **Matrix:** "Access Control" row → "Coming soon" text in all three columns (the matrix already supports text values).
3. **Calculator:** the "Door Access Control" add-on is **pre-selected by default** and pushes the recommendation to Gold. Proposed: remove it from the default selection and either label it "(coming soon)" and disable it, or remove it until launch.
4. **"Membership Card" add-on** doesn't exist on the live page: confirm it's a real, sold add-on, or remove it.
5. **Calculator rule bug:** it recommends Gold above **150** members, but Standard covers **up to 800**. Proposed rule: Platinum if >1 location (multi-branch); Gold if >800 members or a Gold-only add-on/feature; otherwise Standard. Needs your confirmation.
6. Divergence from live: the live page says Access Control is included; the new page will say "coming soon". That is intentional (your decision) and should also be corrected on the live page if it stays up.

### 2.4 Currency formatting

`Rs` → **`NPR`** in the price display (`lib/pricing/content.ts`; the calculator reads the same string, so it follows automatically). Amounts unchanged; no discounts. JSON-LD `Offer`s (NPR, annual) can be added to the SoftwareApplication once you approve the prices: they'd match the visible cards.

Not touched: the feature demo videos contain "Rs. 1,500" in a recorded demo label; leave as is (video content).

**Approval needed:** §2.1 proposed column, §2.3 items 1–5, monthly-switch decision.

## 3. Nepal keyword research

### 3.1 Evidence (Google autocomplete, Nepal)

| Cluster | Nepal-specific suggestions observed | Intent | Fit for Gym Udaan |
|---|---|---|---|
| **Gym software** | "gym management software in nepal", "gym management system nepal / in nepal", "best gym software in nepal", "top gym management software in nepal", "gym management software price", "gym management software with biometric / with door access" | Commercial | ★★★ (homepage, /plans) |
| **Opening a gym** | "gym setup cost in nepal", "cost to open gym in nepal", "how much cost to open gym in nepal", "gym business in nepal", "open gym in nepal" | Informational (future owners) | ★★★ (top of funnel, real audience) |
| **Gym equipment** | "gym equipment price in nepal" (+ daraz, used, machine, outdoor, list) | Informational/commercial (often consumers) | ★★ only inside a setup-cost guide |
| **Registration & tax** | "how to register business pan in nepal", "business registration in nepal fees", "pan registration nepal ird", "vat registration nepal", "shop registration process in nepal" | Informational | ★★ (inside the opening-a-gym guide) |
| **Billing compliance** | "ird billing software nepal", "billing software nepal", "billing software price in nepal" | Commercial/informational | ★★ (only with accurate IRD facts; see §8 Q on certification) |
| **Attendance** | "biometric attendance system / software / machine price in nepal", "attendance management system nepal", "gym attendance app / software / register" | Commercial | ★★★ if biometric attendance is a current feature |
| **Pricing memberships** | "gym fees per month in nepal", "gym membership price in nepal / kathmandu", "average gym fee in nepal" | Mostly consumers | ★ (owner angle only with real price data) |
| **Growth** | "how to increase gym membership (sales / retention)", "gym marketing ideas / strategies", "gym retention strategies" (generic, not Nepal-specific) | Informational | ★★ |
| **Running a gym** | "how to manage a gym business", "how to run a gym business", "gym management tips" (generic) | Informational | ★★ |
| No suggestions (too low to show) | "gym business plan nepal", "gym license nepal", "gym marketing nepal", "fitness business nepal", "is gym business profitable in nepal" | — | Low competition long tails: cover inside bigger guides, not as separate posts |

### 3.2 Competition (observed)

- Nepal-specific gym software competitors visible: **HamroFitness** (publishes a Nepal gym-software guide), **FitFlow**. Neither publishes NPR prices.
- Results for "how to open a gym in Nepal" are dominated by **Indian** guides (licences and costs that don't apply in Nepal) and generic Nepal business-registration posts. **No Nepal gym-specific guide surfaced**: a genuine gap.
- Registration/tax facts come mostly from law-firm/consultancy blogs and news; figures **conflict** (e.g. VAT services threshold NPR 3 million in most sources vs NPR 2 million in one; IRD e-billing threshold Rs 250 million in older reports vs Rs 200 million in a 2026 report). Guides must cite IRD / DoCSCP / OCR primary sources and be dated.

### 3.3 Prioritisation

Scored on Nepal demand evidence, relevance, intent, competition, customer likelihood, originality:

1. **Choosing / pricing gym software in Nepal** (commercial, Nepal demand proven, weak local competition, direct customers).
2. **Opening a gym in Nepal: registration, setup cost** (proven Nepal demand, no Nepal-specific competitor, future customers).
3. **Attendance (biometric/QR), membership & billing operations** (proven demand for attendance/billing software in Nepal, ties to features).
4. **Growth: memberships, retention, marketing** (generic demand, adapt with Nepal specifics: festivals, TikTok/Facebook use, SMS).

Excluded: generic fitness/workout content, city pages, consumer gym-fee lists, "nepali date" (huge volume, wrong intent).

## 4. Proposed articles (12) and 3-month roadmap

Common to every article: real author and real publication date; cite primary sources and date-stamp facts; one CTA to WhatsApp demo; publish by adding content + `published: true` in `lib/blog/registry.ts` (sitemap, canonical and 200 status follow automatically); replace the placeholder listing posts before the first publication (launch gate L2). Internal-link targets that exist today: `/` (and `#services`, `#features`, `#faq`), `/plans`.

| # | Category | Title (SEO) / slug | Primary keyword · secondary | Intent | Priority |
|---|---|---|---|---|---|
| 1 | Software | **How to Choose Gym Management Software in Nepal** · `/blogs/choose-gym-management-software-nepal` | how to choose gym management software · best gym software in nepal, gym management system nepal | Commercial investigation | P1 |
| 2 | Software | **Gym Software Price in Nepal: What Affects the Cost** · `/blogs/gym-software-price-nepal` | gym software price in nepal · gym management software price, billing software price in nepal | Commercial | P1 (after pricing approval) |
| 3 | Business | **How to Open a Gym in Nepal: Registration, PAN/VAT and First Steps** · `/blogs/how-to-open-a-gym-in-nepal` | how to open gym in nepal · gym business in nepal, business registration in nepal, pan registration nepal | Informational (pillar) | P1 |
| 4 | Business | **Gym Setup Cost in Nepal: A Budget Checklist** · `/blogs/gym-setup-cost-nepal` | gym setup cost in nepal · cost to open gym in nepal, gym equipment price in nepal | Informational | P1 *if* real cost data exists (§8) |
| 5 | Operations | **Gym Attendance in Nepal: Register, Biometric or QR Check-in?** · `/blogs/gym-attendance-system-nepal` | gym attendance system · biometric attendance system in nepal, gym attendance app | Commercial/informational | P2 |
| 6 | Operations | **Gym Membership Management: Plans, Renewals and Dues** · `/blogs/gym-membership-management` | gym membership management · gym membership software, renewal reminders | Informational | P2 |
| 7 | Operations | **Gym Billing in Nepal: Receipts, PAN/VAT and IRD Billing Rules** · `/blogs/gym-billing-nepal-ird` | gym billing software nepal · ird billing software nepal, vat registration nepal | Informational | P2 (needs IRD-certification answer) |
| 8 | Business | **How to Increase Gym Memberships in Nepal: 10 Practical Ideas** · `/blogs/increase-gym-memberships-nepal` | how to increase gym membership · gym membership sales, gym marketing ideas | Informational | P2 |
| 9 | Operations | **Gym Member Retention: Why Members Leave and How to Keep Them** · `/blogs/gym-member-retention` | gym membership retention · gym retention strategies | Informational | P3 |
| 10 | Software | **Register vs Gym Software: The Real Cost of Running a Gym on Paper** · `/blogs/gym-register-vs-software` | gym management system · gym attendance register, gym management tips | Commercial investigation | P3 |
| 11 | Business | **Gym Marketing in Nepal: Facebook, Instagram and TikTok** · `/blogs/gym-marketing-nepal` | gym marketing strategies · gym marketing ideas | Informational | P3 |
| 12 | Business | **How to Price Gym Memberships in Nepal** · `/blogs/price-gym-memberships-nepal` | gym membership price in nepal · gym fees per month in nepal | Informational (owner angle) | P3 *only with real market data* |

### 4.1 Briefs for the P1 articles (the rest follow the same template once approved)

**#1 How to Choose Gym Management Software in Nepal**
- Meta: "A practical checklist for gym owners in Nepal: the features, local needs (Nepali dates, payments, SMS) and costs to compare before choosing gym management software."
- H1: How to Choose Gym Management Software in Nepal · H2: What gym software should do (H3 members & renewals / attendance / payments & dues / reports) · H2: Nepal-specific needs (H3 BS + AD dates* / local payment options* / SMS reminders* / Nepali support) · H2: Questions to ask before you buy (pricing model, data export, staff access, mobile app, onboarding) · H2: Register/Excel vs software · H2: Checklist (downloadable) · FAQ
- Nepal info: local payment methods, BS calendar, SMS in Nepal (verify each feature claim with you*).
- Links: `/#services` ("gym membership management"), `/plans` ("compare plans"), `/#faq`. Features: membership, attendance, payments, reports, member app.
- Sources: none legal; product facts confirmed by you. Must not claim "best"; fair, vendor-neutral criteria.

**#2 Gym Software Price in Nepal**
- Meta: "What gym management software costs in Nepal, what drives the price (members, branches, features) and how Gym Udaan's NPR plans compare."
- H1: Gym Software Price in Nepal: What Affects the Cost · H2: Typical pricing models (annual, per member, per branch) · H2: What changes the price (member limits, branches, add-ons, SMS credits) · H2: Hidden costs to ask about (setup, data migration, hardware, SMS) · H2: Gym Udaan plans in NPR (from `/plans`) · H2: Manual vs software cost · FAQ
- Links: `/plans` (primary), `/#services`. Depends on approved pricing (§2) and SMS-credit facts.

**#3 How to Open a Gym in Nepal**
- Meta: "Step by step: registering a gym business in Nepal, PAN and VAT, premises, staff, equipment and the first members. With official sources."
- H1: How to Open a Gym in Nepal · H2: Choose a business structure (H3 private firm via DoCSCP / company via OCR) · H2: Register the business · H2: PAN and VAT with the IRD (H3 when VAT applies, threshold *as per the current Finance Act*) · H2: Local requirements (ward/municipality: **verify with your municipality**) · H2: Premises, equipment and staff · H2: Pricing your memberships · H2: Running day one (members, attendance, payments) · FAQ
- Sources (primary, required): IRD (ird.gov.np), Department of Commerce, Supplies and Consumer Protection (Private Firm Registration Act 2014 BS), Office of the Company Registrar (ocr.gov.np), local municipality. Date-stamp every figure; no Indian licence rules.
- Links: #1, #4, `/#services`.

**#4 Gym Setup Cost in Nepal**: publish only with real numbers: e.g. an anonymised survey of Gym Udaan customer gyms (setup budget ranges by size/city) or cited, dated price sources. Otherwise defer: a cost post without real figures is thin.

### 4.2 Three-month roadmap (quality over volume: 8 articles)

| Month | Articles | Prerequisites |
|---|---|---|
| **1** | #3 How to open a gym in Nepal (pillar) · #1 Choosing gym software · #2 Gym software price | Pricing approved (§2); feature facts confirmed (§8); legal facts checked against IRD/DoCSCP/OCR; blog listing placeholders replaced; first article flips the blog live |
| **2** | #5 Attendance (register/biometric/QR) · #6 Membership management · #7 Billing & IRD rules | Biometric/QR status confirmed; IRD certification answer; screenshots from the product |
| **3** | #8 Increase memberships · #4 Setup cost (if data) *or* #9 Retention | Customer survey (for #4) or retention data/examples |

Monthly: check Search Console queries per article (after access), refresh facts that change (thresholds, fees), and internally link new posts from older ones.

## 5. Testimonials review (flagged, not removed)

| Tile | Flag |
|---|---|
| Amick Khadka, "Khadka Fitness CEO" | Same name is used as a placeholder blog author; confirm real person, gym and consent |
| Video testimonial (unnamed) | Confirm who it is, gym name, consent; label currently generic |
| Ashish Karki, "Karki Fitness" | Same name used as a placeholder blog author; confirm |
| Abhishek Koirala, "Udaan Fitness" | Gym name resembles the company's own name: confirm it's an independent customer |
| (removed earlier) "Customer Name / Gym Name" | Was an explicit placeholder: stays removed |
| Live site's four testimonials (Lekh Gurung, Dipesh Gautam, Bhagendra, Mahesh Maharjan) | Real-looking, named with gyms and cities; could replace/augment **if you confirm** them |

**Decision needed:** keep the current production gate (unapproved tiles hidden until you set `approved: true`) **or** show them as they are. My recommendation: keep the gate until each is confirmed; it removes nothing and the design is unchanged when approved.

## 6. Existing Features sections: copy-only proposals (design, carousel, animation and the 10-second videos untouched)

All feature text is already in the server HTML (verified, including carousel slides).

| Where | Current | Proposed |
|---|---|---|
| "Our Features" description (section subtitle) | "Things that will make your work easy as well as your customers daily life easy with us" (Figma placeholder) | "Gym Udaan takes care of the everyday work of running a gym in Nepal: members and renewals, check-ins, payments and reports, all in one place." |
| "Main Features" description | *Same placeholder sentence* (duplicate) | "Beyond daily management: a member app, social media publishing, a daily daybook and tools to keep members coming back." |
| Card "Member Management" title | Member Management | **Membership Management** (matches "gym membership management"; the card is about memberships and renewals) — optional |
| Card "Attendance Management" description | "…so you always know what's happening" (no full stop) | Add the full stop; mention "check-ins" already present. Add "QR check-in" **only if you confirm** it's offered to gyms |
| Main Features "Reporting" description | Identical to "Reports & Insights" | "Membership, attendance, sales and expense reports, plus monthly summaries of how your gym is doing." (report types confirmed in the live app's route table: please confirm they're available to customers) |
| H2 "Services that work alongside you, not instead of you" | creative | Keep. The keyword work is done by the description and cards, not by forcing it into the headline |

## 7. Mobile LCP: measured, smallest fix proposed

- **LCP element:** the hero frame (`<video>` poster) on mobile and desktop.
- **Cause:** its entrance animation `animate-hero-dashboard` = `hero-fade` (opacity **0** → 1 plus a 1.5 rem rise, 1.2 s, starting 0.88 s after load with backwards fill). Chrome doesn't count elements painted at opacity 0, so LCP waits for a later paint (the first video frame).
- **Test:** isolated production builds, Chromium, 4× CPU, ~1.6 Mbps/150 ms, 3 runs each (2026-11-04):

| Variant (hero frame only) | LCP runs |
|---|---|
| V0 current (fade from 0 + rise) | 4.12 / 4.37 / 4.43 s |
| V1 rise only, no fade | **2.16 / 2.06 / 2.07 s** |
| V2 rise + fade from 40 % opacity | **1.86 / 3.33 / 1.88 s** |

- **Proposal (smallest change):** a dedicated keyframe for the hero frame only, in `app/globals.css`: keep the 1.5 rem rise, timing and easing; start the fade at **40 % instead of 0** (V2), or drop the fade (V1, most consistent). The headline, buttons and every other animation stay exactly as they are. Recommended: **V2** (keeps the premium fade feel) or **V1** if you prefer consistency.
- Verify after implementation: the same trace, Lighthouse mobile median-of-3, screenshot comparison of the hero entrance.

## 8. Search Console & GA4: still missing

- Search Console: verified ownership of `gymudaan.com` (Domain property via DNS TXT) and access for the team; baseline exports (Performance 16 months, Pages, Links) **before launch**.
- GA4: access to the property behind `G-MRY1JZCLXM`; confirm it's the one to keep; check Enhanced Measurement "page changes based on browser history" is **on** (needed for single page_view counting); mark `whatsapp_click` / `get_started_click` as key events; then set `NEXT_PUBLIC_GA_MEASUREMENT_ID` for production builds.
- No ranking, traffic or growth claims can be made until these exist.

## 9. Information still needed from you

1. **Pricing:** approve §2 (names Standard/Gold/Platinum, live taglines, NPR amounts, limits); monthly switch hide/disable; is "Membership Card" a real add-on? correct calculator rules.
2. **Access Control:** is biometric/fingerprint **attendance** (as opposed to door access) available today? QR check-in for customers?
3. **Nepal features:** are BS (Nepali) dates, eSewa/Khalti or other local payment options, SMS reminders and the member app (Play/App Store) current?
4. **Billing:** is Gym Udaan's billing IRD-certified? (Required before article #7 says anything about it.)
5. **Testimonials:** confirm each (§5) and the gate decision.
6. **Blog:** who are the authors (real names/roles)? Can we survey customer gyms for anonymised setup-cost and pricing data (articles #4, #12)?
7. **LCP:** V1 or V2 (§7).
8. **Search Console / GA4** access (§8).

## Sources

Autocomplete: `suggestqueries.google.com` with `gl=np`, 2026-11-04 (raw lists kept with the research notes). Web:
- HamroFitness: https://hamrofitness.com/about · https://hamrofitness.com/news/topic/55
- FitFlow: https://www.fitflow.com.np/
- Nepal business registration (secondary): https://www.kumarijob.com/blog/general-information/how-to-open-a-company-in-nepal · https://www.karobarapp.com/en-us/blogs/how-to-start-a-business-in-nepal-the-practical-guide · https://nitipartners.com/banijya-darta-process-in-nepal/ · https://www.deel.com/blog/sole-proprietorship-nepal/
- VAT (secondary; verify with IRD): https://lawalpine.com/blog/vat-in-nepal-rates-and-thresholds-2082-83 · https://nitipartners.com/pan-and-vat-registration-for-personal-services/ · https://news.bloombergtax.com/daily-tax-report-international/nepal-tax-agency-posts-updated-notice-on-vat-procedures-for-nonresidents-domestic-electronic-service-supplies
- IRD e-billing (secondary; verify with IRD): https://myrepublica.nagariknetwork.com/news/ird-makes-it-mandatory-for-firms-with-transaction-of-rs-250-million-per-annum-to-issue-electronic-billing · https://ictframe.com/?p=114453 · https://pioneerlaw.com/?p=551
