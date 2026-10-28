// SSOT mapping a single semantic sort value to the API's sortBy + sortDir pair.
// Copy this file's shape for any other sortable list. Newest/oldest sort by `id`
// (the API rejects audit.* dot-paths with a 400).
const USER_SORT_OPTIONS = [
  {
    value: "newest",
    label: "Newest first",
    sortBy: "id",
    sortDir: "desc",
  },
  {
    value: "oldest",
    label: "Oldest first",
    sortBy: "id",
    sortDir: "asc",
  },
  {
    value: "email_asc",
    label: "Email (A to Z)",
    sortBy: "email",
    sortDir: "asc",
  },
  {
    value: "email_desc",
    label: "Email (Z to A)",
    sortBy: "email",
    sortDir: "desc",
  },
] as const

export type UserSortValue = (typeof USER_SORT_OPTIONS)[number]["value"]

export const DEFAULT_USER_SORT: UserSortValue = "newest"

export const isUserSortValue = (value: string): value is UserSortValue =>
  USER_SORT_OPTIONS.some((option) => option.value === value)

export const getUserSortParams = (
  value: UserSortValue
): { sortBy: string; sortDir: "asc" | "desc" } => {
  const option = USER_SORT_OPTIONS.find((o) => o.value === value)
  return option
    ? { sortBy: option.sortBy, sortDir: option.sortDir }
    : { sortBy: "id", sortDir: "desc" }
}

export { USER_SORT_OPTIONS }
