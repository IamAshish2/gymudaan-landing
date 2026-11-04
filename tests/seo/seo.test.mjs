// SEO regression suite. Runs against a built, running server:
//
//   SITE_ENV=production NEXT_PUBLIC_SITE_URL=https://www.gymudaan.com npm run build
//   npx next start -p 3100
//   SEO_BASE_URL=http://localhost:3100 SEO_EXPECT=production npm run test:seo
//
// For a staging build use SEO_EXPECT=staging and SEO_ORIGIN=<its site URL>.
// Plain Node (node:test + fetch): no extra dependencies.

import assert from "node:assert/strict"
import { describe, test } from "node:test"

const BASE = process.env.SEO_BASE_URL ?? "http://localhost:3100"
const EXPECT = process.env.SEO_EXPECT ?? "production"
const ORIGIN =
  process.env.SEO_ORIGIN ??
  (EXPECT === "production" ? "https://www.gymudaan.com" : undefined)
const PROD = EXPECT === "production"

if (!["production", "staging"].includes(EXPECT)) {
  throw new Error(`SEO_EXPECT must be production or staging, got "${EXPECT}"`)
}
if (!ORIGIN) throw new Error("Set SEO_ORIGIN to the staging build's site URL")

// The indexable marketing pages and what each must say about itself.
const PAGES = [
  { path: "/", h1: /gym management software/i, breadcrumb: false },
  { path: "/plans", h1: /pricing/i, breadcrumb: true },
  { path: "/terms", h1: /terms/i, breadcrumb: true },
  { path: "/privacy-policy", h1: /privacy/i, breadcrumb: true },
]

// Unverified claims and template content that must never ship (docs/seo/08).
const BANNED_IN_PRODUCTION = [
  /Nepal['’]s #1/i,
  /\+40%/,
  /10K\+/,
  /\b100\+ /,
  /Customer Name/,
  /Gym Name</,
  /All systems operational/,
  /Trusted by more than 100/i,
  /https:\/\/(x|github)\.com/,
  /linkedin\.com|youtube\.com/,
]

const cache = new Map()
const get = async (path, init = {}) => {
  const key = `${path}|${JSON.stringify(init)}`
  if (!cache.has(key)) {
    const res = await fetch(BASE + path, { redirect: "manual", ...init })
    cache.set(key, { res, body: await res.text() })
  }
  return cache.get(key)
}

const head = (html) => html.split("</head>")[0]
const bodyOf = (html) =>
  (html.split("</head>")[1] ?? "").replace(/<script[\s\S]*?<\/script>/g, "")
const all = (html, re) => [...html.matchAll(re)].map((m) => m[1])
const meta = (html, attr, key) =>
  all(head(html), new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`, "g"))
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
const text = (html) =>
  decode(bodyOf(html).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ")
const jsonLd = (html) =>
  all(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g).map(
    (raw) => JSON.parse(raw)
  )
const canonicalFor = (path) => (path === "/" ? ORIGIN : ORIGIN + path)

describe(`marketing pages (${EXPECT})`, () => {
  for (const page of PAGES) {
    test(`${page.path}: 200, one canonical + og:url, title, description, H1`, async () => {
      const { res, body } = await get(page.path)
      assert.equal(res.status, 200)
      const canonical = all(head(body), /<link rel="canonical" href="([^"]*)"/g)
      assert.deepEqual(canonical, [canonicalFor(page.path)])
      assert.deepEqual(meta(body, "property", "og:url"), [canonicalFor(page.path)])
      const titles = all(head(body), /<title>([^<]*)<\/title>/g)
      assert.equal(titles.length, 1, "exactly one <title>")
      assert.ok(titles[0].length <= 60, `title ≤ 60 chars: ${titles[0]}`)
      const [description] = meta(body, "name", "description")
      assert.ok(description && description.length >= 70 && description.length <= 160)
      assert.equal(meta(body, "property", "og:image").length, 1)
      const h1s = all(body, /<h1[^>]*>([\s\S]*?)<\/h1>/g)
      assert.equal(h1s.length, 1, "exactly one H1")
      const h1Text = decode(h1s[0].replace(/<[^>]+>/g, " "))
        .replace(/\s+/g, " ")
        .trim()
      assert.match(h1Text, page.h1)
    })

    test(`${page.path}: indexing matches the environment`, async () => {
      const { res, body } = await get(page.path)
      const robots = meta(body, "name", "robots")
      if (PROD) {
        assert.equal(res.headers.get("x-robots-tag"), null)
        assert.deepEqual(robots, [], "no robots meta on an indexable page")
      } else {
        assert.equal(res.headers.get("x-robots-tag"), "noindex, nofollow")
        assert.ok(robots.length > 0 && robots.every((r) => r.startsWith("noindex")))
      }
    })

    test(`${page.path}: structured data parses and is consistent`, async () => {
      const { body } = await get(page.path)
      const blocks = jsonLd(body)
      assert.ok(blocks.length > 0)
      const flat = JSON.stringify(blocks)
      assert.doesNotMatch(flat, /aggregateRating|"Review"|ratingValue/)
      if (page.path === "/") {
        const graph = blocks.find((b) => b["@graph"])?.["@graph"] ?? []
        const types = graph.map((n) => n["@type"]).sort()
        assert.deepEqual(types, ["Organization", "SoftwareApplication", "WebSite"])
        for (const node of graph) {
          assert.ok(node["@id"].startsWith(`${ORIGIN}/#`), node["@id"])
        }
        // FAQPage answers must be visible text on the page.
        const faq = blocks.find((b) => b["@type"] === "FAQPage")
        assert.ok(faq, "FAQPage on the homepage")
        for (const q of faq.mainEntity) {
          assert.ok(text(body).includes(q.name), q.name)
          assert.ok(text(body).includes(q.acceptedAnswer.text), q.name)
        }
      }
      if (page.breadcrumb) {
        const crumb = blocks.find((b) => b["@type"] === "BreadcrumbList")
        assert.ok(crumb, "BreadcrumbList")
        assert.equal(crumb.itemListElement.at(-1).item, ORIGIN + page.path)
      }
    })
  }

  test("titles and descriptions are unique across pages", async () => {
    const titles = new Set()
    const descriptions = new Set()
    for (const page of PAGES) {
      const { body } = await get(page.path)
      titles.add(all(head(body), /<title>([^<]*)<\/title>/g)[0])
      descriptions.add(meta(body, "name", "description")[0])
    }
    assert.equal(titles.size, PAGES.length)
    assert.equal(descriptions.size, PAGES.length)
  })

  test("FAQPage markup appears on the homepage only", async () => {
    for (const page of PAGES) {
      const { body } = await get(page.path)
      const count = jsonLd(body).filter((b) => b["@type"] === "FAQPage").length
      assert.equal(count, page.path === "/" ? 1 : 0, page.path)
    }
  })
})

describe(`robots.txt and sitemap (${EXPECT})`, () => {
  test("robots.txt", async () => {
    const { res, body } = await get("/robots.txt")
    assert.equal(res.status, 200)
    assert.doesNotMatch(body, /^Disallow: \/\s*$/m, "never block the whole site")
    assert.doesNotMatch(body, /_next|onboarding/)
    if (PROD) {
      for (const path of ["/dashboard", "/admin", "/account", "/auth/", "/getting-started", "/super/", "/admin/", "/api/"]) {
        assert.match(body, new RegExp(`^Disallow: ${path.replace(/\//g, "\\/")}$`, "m"), path)
      }
      assert.match(body, new RegExp(`^Sitemap: ${ORIGIN}/sitemap.xml$`, "m"))
    } else {
      assert.doesNotMatch(body, /Sitemap:/)
    }
  })

  test("sitemap lists exactly the indexable pages", async () => {
    const { res, body } = await get("/sitemap.xml")
    assert.equal(res.status, 200)
    const locs = all(body, /<loc>([^<]+)<\/loc>/g).sort()
    if (!PROD) return assert.deepEqual(locs, [])
    assert.deepEqual(locs, PAGES.map((p) => `${ORIGIN}${p.path === "/" ? "/" : p.path}`).sort())
    assert.doesNotMatch(body, /lastmod/, "no fabricated lastmod")
  })
})

describe(`HTTP status codes and redirects (${EXPECT})`, () => {
  const cases = [
    ["/pricing", 308, "/plans"],
    ["/plans/", 308, "/plans"],
    ["/nope-xyz", 404],
    ["/blogs/nope", 404],
    ["/blogs/Manage-Gym-Efficiently", 404],
    ["/blogs/%E0%A4%A", 404],
    ["/blogs/a/b", 404],
    ["/blogs", PROD ? 404 : 200],
    ["/blogs/manage-gym-efficiently", PROD ? 404 : 200],
    ["/dashboard", 307, "/"],
    ["/admin", 307, "/"],
    ["/account", 307, "/"],
  ]
  for (const [path, status, location] of cases) {
    test(`${path} → ${status}${location ? ` ${location}` : ""}`, async () => {
      const { res } = await get(path)
      assert.equal(res.status, status)
      if (location) {
        assert.equal(new URL(res.headers.get("location"), BASE).pathname, location)
      }
    })
  }

  test("redirects resolve in one hop", async () => {
    for (const path of ["/pricing", "/plans/"]) {
      const first = await fetch(BASE + path, { redirect: "manual" })
      const next = await fetch(new URL(first.headers.get("location"), BASE), { redirect: "manual" })
      assert.equal(next.status, 200, `${path} → ${first.headers.get("location")}`)
    }
  })

  test("auth routes pass through with a session cookie", async () => {
    for (const path of ["/dashboard", "/admin", "/account"]) {
      const { res } = await get(path, { headers: { cookie: "access_token=t" } })
      assert.equal(res.status, 200, path)
    }
  })
})

describe(`content and links (${EXPECT})`, () => {
  test("no unverified claims or template content in production", { skip: !PROD }, async () => {
    for (const path of [...PAGES.map((p) => p.path), "/nope-xyz"]) {
      const { body } = await get(path)
      for (const re of BANNED_IN_PRODUCTION) assert.doesNotMatch(body, re, `${path}: ${re}`)
    }
  })

  test("unapproved sections stay out of production, visible in staging", async () => {
    const { body } = await get("/")
    for (const id of ['id="testimonials"', 'id="stats-title"', 'id="insights"']) {
      assert.equal(body.includes(id), !PROD, id)
    }
  })

  test("every internal link resolves (and #anchors exist)", async () => {
    const seen = new Set()
    for (const page of PAGES) {
      const { body } = await get(page.path)
      for (const href of all(bodyOf(body), /<a[^>]*href="([^"]+)"/g)) {
        if (!href.startsWith("/") || href.startsWith("//")) continue
        seen.add(decode(href))
      }
    }
    for (const href of seen) {
      const [path, hash] = href.split("#")
      let { res, body } = await get(path || "/")
      if ([307, 308].includes(res.status)) {
        ;({ res, body } = await get(new URL(res.headers.get("location"), BASE).pathname))
      }
      assert.equal(res.status, 200, `link ${href}`)
      if (hash) assert.ok(body.includes(`id="${hash}"`), `anchor ${href}`)
    }
  })

  test("/plans shows the NPR plans and its Offers match them", async () => {
    const { body } = await get("/plans")
    const visible = text(body)
    for (const price of ["NPR 14,999", "NPR 19,999", "NPR 24,999"]) {
      assert.ok(visible.includes(price), price)
    }
    assert.doesNotMatch(visible, /\bRs\.? ?\d/, "no Rs prices")
    const software = jsonLd(body).find((b) => b.offers)
    assert.ok(software, "Offers JSON-LD on /plans")
    assert.equal(software["@id"], `${ORIGIN}/#software`)
    assert.deepEqual(
      software.offers.map((o) => [o.name, o.price, o.priceCurrency]),
      [
        ["Standard", "14999", "NPR"],
        ["Gold", "19999", "NPR"],
        ["Platinum", "24999", "NPR"],
      ]
    )
  })

  test("draft guides: 404 in production, previewable in staging", async () => {
    for (const slug of [
      "how-to-open-a-gym-in-nepal",
      "choose-gym-management-software-nepal",
      "gym-software-price-nepal",
    ]) {
      const { res } = await get(`/blogs/${slug}`)
      assert.equal(res.status, PROD ? 404 : 200, slug)
    }
  })

  test("legal pages are linked from the footer", async () => {
    const { body } = await get("/")
    assert.match(body, /href="\/terms"/)
    assert.match(body, /href="\/privacy-policy"/)
  })
})
