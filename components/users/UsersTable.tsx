"use client"

import { useEffect, useMemo, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { useRouter } from "next/navigation"

import { getUsersColumns } from "@/components/users/UsersColumns"
import UserDetailSheet from "@/components/users/UserDetailSheet"
import UserDialog from "@/components/users/UserDialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import {
  IArrowUpDown,
  IChevronLeft,
  IChevronRight,
  IEye,
  IPlus,
  ISearch,
  IX,
} from "@/lib/icons"
import type { Role } from "@/lib/roles/types"
import { ROUTES } from "@/lib/routes"
import {
  DEFAULT_USER_SORT,
  USER_SORT_OPTIONS,
  type UserSortValue,
} from "@/lib/users/sort"
import type { AppUser } from "@/lib/users/types"
import { cn } from "@/lib/utils"

export type UserActiveFilter = "ALL" | "ACTIVE" | "INACTIVE"

type UsersTableProps = {
  data: AppUser[]
  page: number
  totalPages: number
  totalElements: number
  active: UserActiveFilter
  query: string
  sort: UserSortValue
  roles: Role[]
}

type ParamsPatch = {
  page?: number
  active?: UserActiveFilter
  query?: string
  sort?: UserSortValue
}

const UsersTable = ({
  data,
  page,
  totalPages,
  totalElements,
  active,
  query,
  sort,
  roles,
}: UsersTableProps) => {
  const router = useRouter()
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [searchInput, setSearchInput] = useState(query)
  const debouncedSearch = useDebouncedValue(searchInput, 350)

  const columns = useMemo(() => getUsersColumns(roles), [roles])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  })

  const updateParams = (patch: ParamsPatch) => {
    const next = {
      page: patch.page ?? page,
      active: patch.active ?? active,
      query: patch.query ?? query,
      sort: patch.sort ?? sort,
    }

    const search = new URLSearchParams()
    search.set("page", String(next.page))

    if (next.active !== "ALL") search.set("active", next.active.toLowerCase())
    if (next.query) search.set("query", next.query)
    if (next.sort !== DEFAULT_USER_SORT) search.set("sort", next.sort)

    router.push(`${ROUTES.admin.users}?${search.toString()}`)
  }

  // Browser back/forward can change `query` externally — keep the input in sync.
  useEffect(() => {
    setSearchInput(query)
  }, [query])

  useEffect(() => {
    if (debouncedSearch === query) return

    updateParams({ page: 0, query: debouncedSearch })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <ISearch className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by email…"
            className="pr-8 pl-8"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <IX className="size-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={sort}
            onValueChange={(value) =>
              updateParams({ page: 0, sort: value as UserSortValue })
            }
          >
            <SelectTrigger className="w-44 min-w-0">
              <IArrowUpDown className="size-4 shrink-0 text-muted-foreground" />
              <SelectValue className="min-w-0 flex-1 truncate" />
            </SelectTrigger>
            <SelectContent className="max-w-44">
              {USER_SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  title={option.label}
                  className="min-w-0"
                >
                  <span className="truncate">{option.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={active}
            onValueChange={(value) =>
              updateParams({ page: 0, active: value as UserActiveFilter })
            }
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <IEye />
                Columns
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-44" align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={() => setCreateOpen(true)}>
            <IPlus />
            Create user
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Total: {totalElements} user{totalElements === 1 ? "" : "s"}
      </p>

      <div className="flex flex-col gap-4">
        <Card className="gap-0 py-0">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "bg-muted",
                          header.column.id === "actions" && "text-right"
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="cursor-pointer"
                      tabIndex={0}
                      onClick={() => setSelectedUser(row.original)}
                      onKeyDown={(e) => {
                        if (e.target !== e.currentTarget) return
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setSelectedUser(row.original)
                        }
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      {query
                        ? "No users match your search."
                        : "No users in this filter."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 0}
              onClick={() => updateParams({ page: page - 1 })}
            >
              <IChevronLeft />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page + 1 >= totalPages}
              onClick={() => updateParams({ page: page + 1 })}
            >
              Next
              <IChevronRight />
            </Button>
          </div>
        </div>
      </div>

      <UserDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        roles={roles}
      />

      <UserDetailSheet
        user={selectedUser}
        roles={roles}
        open={selectedUser !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedUser(null)
        }}
      />
    </div>
  )
}

export default UsersTable
