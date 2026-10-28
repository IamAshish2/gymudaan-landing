"use client"

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
import { IRotateCcw, ITriangleAlert } from "@/lib/icons"
import { ROUTES } from "@/lib/routes"

type RootErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const RootError = ({ error, reset }: RootErrorProps) => {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-10 px-6 py-16">
      <Link href={ROUTES.home} aria-label="Home">
        <BrandMark />
      </Link>

      <Empty className="max-w-lg">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ITriangleAlert />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            {error?.message ||
              "An unexpected error stopped us from loading this page. Try again, and if it keeps happening, head back home."}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button onClick={reset}>
            <IRotateCcw data-icon="inline-start" />
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href={ROUTES.home}>Go to home</Link>
          </Button>
        </EmptyContent>
        {error.digest ? (
          <EmptyDescription className="font-mono text-xs">
            Error reference: {error.digest}
          </EmptyDescription>
        ) : null}
      </Empty>
    </main>
  )
}

export default RootError
