import type { Metadata } from "next"
import { Suspense } from "react"

import UsersTable, {
  type UserActiveFilter,
} from "@/components/users/UsersTable"
import UsersTableSkeleton from "@/components/users/skeletons/UsersTableSkeleton"
import Typography from "@/components/ui/Typography"
import { requireRole } from "@/lib/auth/permissions"
import { getRoles } from "@/lib/roles/api"
import {
  DEFAULT_USER_SORT,
  getUserSortParams,
  isUserSortValue,
} from "@/lib/users/sort"
import { getUsers } from "@/lib/users/api"

export const metadata: Metadata = {
  title: "Users",
  robots: { index: false, follow: false },
}

const PAGE_SIZE = 10

type AdminUsersPageProps = {
  searchParams: Promise<{
    page?: string
    active?: string
    query?: string
    sort?: string
  }>
}

const resolveActive = (
  value: string | undefined
): { filter: UserActiveFilter; active?: boolean } => {
  if (value === "true") return { filter: "ACTIVE", active: true }
  if (value === "false") return { filter: "INACTIVE", active: false }
  return { filter: "ALL" }
}

const UsersSection = async ({ searchParams }: AdminUsersPageProps) => {
  const {
    page: pageParam,
    active: activeParam,
    query: queryParam,
    sort: sortParam,
  } = await searchParams

  const page = Math.max(0, Number(pageParam ?? 0) || 0)
  const { filter, active } = resolveActive(activeParam)
  const query = queryParam?.trim() || undefined
  const sort =
    sortParam && isUserSortValue(sortParam) ? sortParam : DEFAULT_USER_SORT

  const [result, roles] = await Promise.all([
    getUsers({
      page,
      size: PAGE_SIZE,
      query,
      active,
      ...getUserSortParams(sort),
    }),
    getRoles(),
  ])

  return (
    <UsersTable
      data={result?.page?.content ?? []}
      page={result?.page?.number ?? 0}
      totalPages={result?.page?.totalPages ?? 0}
      totalElements={result?.page?.totalElements ?? 0}
      active={filter}
      query={query ?? ""}
      sort={sort}
      roles={roles}
    />
  )
}

const AdminUsersPage = async (props: AdminUsersPageProps) => {
  await requireRole("ADMIN")

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" as="h1">
          Users
        </Typography>
        <Typography variant="muted">
          Platform accounts and the role each one is assigned.
        </Typography>
      </div>

      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersSection {...props} />
      </Suspense>
    </div>
  )
}

export default AdminUsersPage
