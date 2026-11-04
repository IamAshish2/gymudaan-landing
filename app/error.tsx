"use client"

import Link from "next/link"

import LandingLogo, {
  LOGO_HOME_LABEL,
} from "@/components/landing/layout/LandingLogo"
import Container from "@/components/landing/primitives/Container"
import LandingButton from "@/components/landing/primitives/LandingButton"
import PageIntro from "@/components/landing/primitives/PageIntro"
import Typography from "@/components/ui/Typography"
import { errorPage } from "@/lib/landing/content"
import { IRotateCcw } from "@/lib/icons"
import { SITE } from "@/lib/site"

type RootErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

// Marketing look without the full header and footer, in case one of them is
// what failed. The raw error message is never shown: the digest lets support
// find the server log instead.
const RootError = ({ error, reset }: RootErrorProps) => (
  <div className="flex min-h-svh flex-col bg-surface-dark text-white">
    <title>{`${errorPage.title} | ${SITE.name}`}</title>
    <Container className="pt-6 lg:pt-8">
      <Link
        href={errorPage.home.href}
        aria-label={LOGO_HOME_LABEL}
        className="inline-flex rounded-badge outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60"
      >
        <LandingLogo />
      </Link>
    </Container>

    <main className="flex flex-1 flex-col pb-section">
      <PageIntro
        badge={errorPage.badge}
        title={errorPage.heading}
        description={errorPage.description}
        descriptionClassName="max-w-[30em] text-pretty"
      >
        <div className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:justify-center">
          <LandingButton onClick={reset}>
            <IRotateCcw aria-hidden className="size-[0.9em]" />
            {errorPage.retry}
          </LandingButton>
          <LandingButton variant="dark" asChild>
            <Link href={errorPage.home.href}>{errorPage.home.label}</Link>
          </LandingButton>
        </div>
        {error.digest ? (
          <Typography variant="badge" className="mt-6 opacity-60">
            {errorPage.reference} <code>{error.digest}</code>
          </Typography>
        ) : null}
      </PageIntro>
    </main>
  </div>
)

export default RootError
