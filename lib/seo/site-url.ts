// The public origin behind every canonical, og:url, sitemap and robots URL.
// It is the only module that reads NEXT_PUBLIC_SITE_URL. A production build
// fails loudly instead of silently emitting localhost URLs.

const DEV_FALLBACK = "http://localhost:3000"
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"])

const resolveSiteUrl = (): URL => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!raw) {
    // `next dev` only: `next build` and `next start` run with NODE_ENV=production.
    if (process.env.NODE_ENV !== "production") return new URL(DEV_FALLBACK)
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is required for production builds (for example https://www.gymudaan.com)."
    )
  }

  let url: URL
  try {
    url = new URL(raw)
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid URL: "${raw}".`)
  }

  if (url.protocol !== "https:" && !LOCAL_HOSTS.has(url.hostname)) {
    throw new Error(`NEXT_PUBLIC_SITE_URL must use https: "${raw}".`)
  }
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be an origin only, with no path, query or hash: "${raw}".`
    )
  }

  return new URL(url.origin)
}

export const SITE_URL = resolveSiteUrl()

/** Absolute URL on the public origin, for places that need a full URL. */
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString()
