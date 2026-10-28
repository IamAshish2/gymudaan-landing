import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Shape of a body cell, matching the real column renderers used across the app:
// text bar, two-line stack, thumbnail + stack, badge pill, or a trailing icon.
export type TableSkeletonCell = "text" | "stacked" | "avatar" | "badge" | "icon"

export type TableSkeletonColumn = {
  cell?: TableSkeletonCell
  /** Width of the primary body bar, e.g. "w-28". */
  width?: string
  /** Width of the header label bar, e.g. "w-16". */
  headerWidth?: string
  align?: "right"
  /** avatar only: square matches ImageThumb, circle matches Avatar. */
  avatarShape?: "square" | "circle"
  /** avatar only: 1 when the real cell shows a single line, no meta below. */
  lines?: 1 | 2
}

type DataTableSkeletonProps = {
  columns: TableSkeletonColumn[]
  rows?: number
}

const BodyCell = ({
  cell = "text",
  width,
  align,
  avatarShape = "square",
  lines = 2,
}: TableSkeletonColumn) => {
  switch (cell) {
    case "avatar":
      return (
        <div className="flex items-center gap-3">
          <Skeleton
            className={cn(
              "shrink-0",
              avatarShape === "circle"
                ? "size-8 rounded-full"
                : "size-9 rounded-lg"
            )}
          />
          {lines === 1 ? (
            <Skeleton className={cn("h-3.5", width ?? "w-28")} />
          ) : (
            <div className="flex flex-col gap-1.5">
              <Skeleton className={cn("h-3.5", width ?? "w-28")} />
              <Skeleton className="h-3 w-16" />
            </div>
          )}
        </div>
      )
    case "stacked":
      return (
        <div className="flex flex-col gap-1.5">
          <Skeleton className={cn("h-3.5", width ?? "w-28")} />
          <Skeleton className="h-3 w-16" />
        </div>
      )
    case "badge":
      return <Skeleton className="h-6 w-20 rounded-full" />
    case "icon":
      return (
        <Skeleton
          className={cn("size-8 rounded-md", align === "right" && "ml-auto")}
        />
      )
    default:
      return (
        <Skeleton
          className={cn(
            "h-3.5",
            width ?? "w-24",
            align === "right" && "ml-auto"
          )}
        />
      )
  }
}

// Reusable loading state for the app's standalone list tables. Renders the real
// Card + Table geometry — a bg-muted header strip and rows x columns of
// shape-matched bars — so the skeleton reads as the same table that follows it.
// Header bars use bg-foreground/10 to stay visible against the muted header row.
const DataTableSkeleton = ({ columns, rows = 5 }: DataTableSkeletonProps) => (
  <Card className="gap-0 py-0">
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={cn(
                  "bg-muted",
                  column.align === "right" && "text-right"
                )}
              >
                <Skeleton
                  className={cn(
                    "h-3.5 bg-foreground/10",
                    column.headerWidth ?? "w-16",
                    column.align === "right" && "ml-auto"
                  )}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-transparent">
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  className={cn(column.align === "right" && "text-right")}
                >
                  <BodyCell {...column} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

export default DataTableSkeleton
