import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Mirrors AccountSummaryCard: header + three icon/label/value rows.
const AccountSummarySkeleton = () => (
  <Card>
    <CardHeader className="gap-2">
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-4 w-56" />
    </CardHeader>
    <CardContent className="flex flex-col gap-5">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="flex items-start gap-3">
          <Skeleton className="mt-0.5 size-4" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3.5 w-14" />
            <Skeleton className="h-4 w-44" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
)

export default AccountSummarySkeleton
