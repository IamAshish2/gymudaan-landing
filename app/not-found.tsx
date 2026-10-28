import Link from "next/link"

import BrandMark from "@/components/shared/BrandMark"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Typography from "@/components/ui/Typography"
import { ISearchX } from "@/lib/icons"
import { ROUTES } from "@/lib/routes"

const NotFound = () => {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-10 px-6 py-16">
      <Link href={ROUTES.home} aria-label="Home">
        <BrandMark />
      </Link>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ISearchX />
          </EmptyMedia>
          <Typography
            variant="h1"
            className="text-6xl leading-none text-primary lg:text-7xl"
          >
            404
          </Typography>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            We couldn&apos;t find the page you were looking for. It may have
            been moved or renamed.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button asChild>
            <Link href={ROUTES.home}>Back to home</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}

export default NotFound
