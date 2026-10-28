import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import { apiFetch, ApiError } from "@/lib/api-client"
import { CACHE_TAGS } from "@/lib/cache-tags"
import type { PagedResult } from "@/lib/types"
import type { Role } from "@/lib/roles/types"

// Roles are few (seeded + custom), so we fetch one large page and filter/list
// client-side rather than paginate the URL.
const ROLES_PAGE_SIZE = 100

// Zero rows can come back as an error envelope instead of an empty page —
// treat any non-401 ApiError as "none".
export const getRoles = async (): Promise<Role[]> => {
  "use cache: private"
  cacheTag(CACHE_TAGS.roles)
  cacheLife({ stale: 30 })

  try {
    const result = await apiFetch<PagedResult<Role>>(
      `/roles?page=0&size=${ROLES_PAGE_SIZE}`
    )

    return result?.page?.content ?? []
  } catch (err) {
    if (err instanceof ApiError && err.status !== 401) {
      return []
    }

    throw err
  }
}
