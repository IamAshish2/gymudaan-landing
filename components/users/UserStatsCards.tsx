import Link from "next/link"

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import GridContainer from "@/components/ui/GridContainer"
import { IArrowRight } from "@/lib/icons"
import { ROUTES } from "@/lib/routes"
import { getUsers } from "@/lib/users/api"

// One size-1 page is enough — the API returns the totals alongside it.
const UserStatsCards = async () => {
  const result = await getUsers({ page: 0, size: 1 })

  const stats = [
    { label: "Total users", value: result.page.totalElements },
    { label: "Active", value: result.activeCount },
    { label: "Inactive", value: result.inActiveCount },
  ]

  return (
    <GridContainer className="gap-4 md:gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="col-span-4">
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums">
              {stat.value.toLocaleString()}
            </CardTitle>
            <CardAction>
              <Link
                href={ROUTES.admin.users}
                className="text-muted-foreground hover:text-foreground"
                aria-label={`View ${stat.label.toLowerCase()}`}
              >
                <IArrowRight className="size-4" />
              </Link>
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </GridContainer>
  )
}

export default UserStatsCards
