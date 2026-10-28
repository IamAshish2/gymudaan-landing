import { Card, CardHeader } from "@/components/ui/card"
import GridContainer from "@/components/ui/GridContainer"
import { Skeleton } from "@/components/ui/skeleton"

// Mirrors UserStatsCards: three label + number cards.
const UserStatsCardsSkeleton = () => (
  <GridContainer className="gap-4 md:gap-6">
    {Array.from({ length: 3 }, (_, i) => (
      <Card key={i} className="col-span-4">
        <CardHeader className="gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-16" />
        </CardHeader>
      </Card>
    ))}
  </GridContainer>
)

export default UserStatsCardsSkeleton
