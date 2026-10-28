import Link from "next/link"
import type { ReactNode } from "react"

import BrandMark from "@/components/shared/BrandMark"
import GridContainer from "@/components/ui/GridContainer"
import Typography from "@/components/ui/Typography"
import { ROUTES } from "@/lib/routes"
import { SITE } from "@/lib/site"

type AuthShellProps = {
  children: ReactNode
}

// Left brand panel (hidden on mobile, visible lg+) + right column with logo + form
const AuthShell = ({ children }: AuthShellProps) => (
  <GridContainer className="min-h-svh gap-0">
    <figure
      aria-hidden="true"
      className="relative col-span-6 hidden overflow-hidden bg-primary text-primary-foreground lg:block"
    >
      <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary-foreground/10 blur-3xl" />
      <div className="absolute -right-32 -bottom-32 size-[28rem] rounded-full bg-primary-foreground/10 blur-3xl" />

      <div className="relative flex h-full flex-col justify-end gap-3 p-10">
        <Typography variant="h2" as="p" className="max-w-md">
          {SITE.tagline}
        </Typography>
        <Typography as="p" className="max-w-md text-primary-foreground/80">
          {SITE.description}
        </Typography>
      </div>
    </figure>

    {/* Right column */}
    <div className="col-span-4 flex flex-col px-6 py-10 sm:px-10 lg:col-span-6">
      <Link href={ROUTES.home} className="self-center" aria-label="Home">
        <BrandMark />
      </Link>

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
        {children}
      </div>
    </div>
  </GridContainer>
)

export default AuthShell
