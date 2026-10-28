// Single source of truth for cache tags — reads tag with these, server actions
// invalidate them with updateTag(). Add one entry per cached resource.
export const CACHE_TAGS = {
  users: "users",
  roles: "roles",
} as const
