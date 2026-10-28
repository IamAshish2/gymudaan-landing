import DataTableSkeleton from "@/components/shared/skeletons/DataTableSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

// Mirrors UsersTable's toolbar (search + sort/status selects + columns +
// create button, all h-9) and its five columns.
const UsersTableSkeleton = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <Skeleton className="h-9 w-full rounded-full sm:max-w-xs" />

      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="h-9 w-44 rounded-full" />
        <Skeleton className="h-9 w-44 rounded-full" />
        <Skeleton className="h-9 w-28 rounded-full" />
        <Skeleton className="h-9 w-32 rounded-full" />
      </div>
    </div>

    <Skeleton className="h-5 w-32" />

    <DataTableSkeleton
      columns={[
        {
          cell: "avatar",
          avatarShape: "circle",
          lines: 1,
          width: "w-40",
          headerWidth: "w-12",
        },
        { cell: "badge", headerWidth: "w-12" },
        { cell: "badge", headerWidth: "w-14" },
        { cell: "text", width: "w-24", headerWidth: "w-16" },
        { cell: "icon", align: "right", headerWidth: "w-12" },
      ]}
    />

    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-24" />

      <div className="flex gap-2">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  </div>
)

export default UsersTableSkeleton
