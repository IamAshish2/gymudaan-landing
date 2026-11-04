// Which deployment a build is for, validated once by next.config.ts. Only a
// `production` build may be indexed. Every check fails the build rather than
// shipping a wrong guess: an indexable preview, or a live site that is
// accidentally noindexed. Pure and free of `@/` imports so next.config.ts can
// load it. App code reads the result through lib/seo/indexing.ts.

export const SITE_ENVS = [
  "production",
  "staging",
  "preview",
  "development",
] as const

export type SiteEnv = (typeof SITE_ENVS)[number]

/** The only origin a production build may use (docs/seo/03 §1). */
export const PRODUCTION_ORIGIN = "https://www.gymudaan.com"

type Env = Record<string, string | undefined>

const isSiteEnv = (value: string): value is SiteEnv =>
  (SITE_ENVS as readonly string[]).includes(value)

const originOf = (raw: string | undefined): string | undefined => {
  if (!raw?.trim()) return undefined
  try {
    return new URL(raw.trim()).origin
  } catch {
    return undefined // lib/seo/site-url.ts reports malformed values
  }
}

// Hosting providers that say whether a build is their production deployment.
// Each check only runs on its own platform, so this works on any host; where a
// platform exposes nothing, SITE_ENV and the origin check below still apply.
const hostingProblems = (env: Env): string[] => {
  const problems: string[] = []

  if (env.VERCEL === "1" && env.VERCEL_ENV !== "production") {
    problems.push(
      `Vercel reports VERCEL_ENV="${env.VERCEL_ENV ?? ""}", not "production".`
    )
  }
  if (env.NETLIFY === "true" && env.CONTEXT !== "production") {
    problems.push(
      `Netlify reports CONTEXT="${env.CONTEXT ?? ""}", not "production".`
    )
  }
  if (env.CF_PAGES === "1") {
    // Cloudflare Pages only exposes the branch, so the production branch must
    // be named explicitly.
    const productionBranch = env.SITE_PRODUCTION_BRANCH?.trim()
    if (!productionBranch) {
      problems.push(
        "On Cloudflare Pages, set SITE_PRODUCTION_BRANCH to the production branch."
      )
    } else if (env.CF_PAGES_BRANCH !== productionBranch) {
      problems.push(
        `Cloudflare Pages is building branch "${env.CF_PAGES_BRANCH ?? ""}", not the production branch "${productionBranch}".`
      )
    }
  }

  return problems
}

/**
 * Resolves SITE_ENV. With `requireExplicit` (every `next build`) a missing
 * value fails; otherwise (`next dev`) it defaults to `development`.
 */
export const resolveSiteEnv = (
  env: Env,
  { requireExplicit }: { requireExplicit: boolean }
): SiteEnv => {
  const raw = env.SITE_ENV?.trim()

  if (!raw) {
    if (!requireExplicit) return "development"
    throw new Error(
      `SITE_ENV is required for builds: one of ${SITE_ENVS.join(", ")}.`
    )
  }
  if (!isSiteEnv(raw)) {
    throw new Error(
      `SITE_ENV="${raw}" is not valid: use one of ${SITE_ENVS.join(", ")}.`
    )
  }

  const origin = originOf(env.NEXT_PUBLIC_SITE_URL)
  const problems: string[] = []

  if (raw === "production") {
    if (origin !== PRODUCTION_ORIGIN) {
      problems.push(
        `NEXT_PUBLIC_SITE_URL must be ${PRODUCTION_ORIGIN} (got "${env.NEXT_PUBLIC_SITE_URL ?? ""}").`
      )
    }
    problems.push(...hostingProblems(env))
  } else if (origin === PRODUCTION_ORIGIN) {
    // A build that claims the live origin but not production is almost
    // certainly a mislabelled production deploy, which would noindex the site.
    problems.push(
      `NEXT_PUBLIC_SITE_URL is the production origin, so SITE_ENV must be "production". Give ${raw} builds their own origin.`
    )
  }

  if (problems.length > 0) {
    throw new Error(
      `SITE_ENV="${raw}" failed validation:\n- ${problems.join("\n- ")}`
    )
  }

  return raw
}
