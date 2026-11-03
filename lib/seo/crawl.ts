// Crawl restrictions carried over verbatim from the live robots.txt at
// https://www.gymudaan.com/robots.txt (origin block, checked 2026-11-03). They
// keep crawlers out of the gym-management app that shares the www host. These
// are not routes of this app, so they are not in ROUTES. Change this list only
// after the routing and indexing audit (docs/seo/03 §2).
export const LIVE_APP_DISALLOW = [
  "/auth/",
  "/getting-started",
  "/super/",
  "/admin/",
  "/api/",
] as const
