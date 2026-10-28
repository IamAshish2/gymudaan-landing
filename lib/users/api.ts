import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import { apiFetch, ApiError } from "@/lib/api-client"
import { CACHE_TAGS } from "@/lib/cache-tags"
import type { PagedResult } from "@/lib/types"
import type { AppUser } from "@/lib/users/types"

export type UsersQueryParams = {
  page: number
  size: number
  query?: string
  active?: boolean
  sortBy?: string
  sortDir?: "asc" | "desc"
}

const EMPTY_USERS: PagedResult<AppUser> = {
  page: {
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 0,
    number: 0,
    numberOfElements: 0,
    first: true,
    last: true,
    empty: true,
  },
  activeCount: 0,
  inActiveCount: 0,
}

// Admin user list via the generic search contract (docs/API.md §Users). Cookie-scoped,
// so "use cache: private". Any non-401 ApiError → empty page (the API can answer an
// empty result with an error envelope instead of an empty page).
export const getUsers = async (
  params: UsersQueryParams
): Promise<PagedResult<AppUser>> => {
  "use cache: private"
  cacheTag(CACHE_TAGS.users)
  cacheLife({ stale: 30 })

  const search = new URLSearchParams({
    page: String(params.page),
    size: String(params.size),
  })

  if (params.query) {
    search.set("query", params.query)
  }

  if (params.active !== undefined) {
    search.set("active", String(params.active))
  }

  if (params.sortBy) {
    search.set("sortBy", params.sortBy)
    search.set("sortDir", params.sortDir ?? "asc")
    search.set("ignoreCaseSort", "true")
  }

  try {
    return await apiFetch<PagedResult<AppUser>>(
      `/appUser/get-all?${search.toString()}`
    )
  } catch (err) {
    if (err instanceof ApiError && err.status !== 401) {
      return EMPTY_USERS
    }

    throw err
  }
}
