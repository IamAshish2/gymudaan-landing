import type { Metadata } from "next"
import Link from "next/link"

import AuthHeader from "@/components/auth/AuthHeader"
import LoginForm from "@/components/auth/LoginForm"
import Typography from "@/components/ui/Typography"
import { ROUTES } from "@/lib/routes"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false, follow: false },
}

const LoginPage = () => (
  <>
    <AuthHeader />
    <section className="flex flex-1 items-center justify-center px-onboarding-panel-x py-onboarding-panel-y">
      <div className="flex w-full max-w-auth-form flex-col gap-6">
        {/* Flat panel: hairline border, no shadow. */}
        <div className="flex flex-col gap-8 rounded-panel border border-line-light bg-surface-light px-5 py-8 sm:px-10 sm:py-10">
          <header className="flex flex-col gap-1 text-center">
            <Typography variant="title" as="h1">
              Welcome back
            </Typography>
            <Typography variant="bodyLg" className="text-ink-muted">
              Log in to manage your gym.
            </Typography>
          </header>

          <LoginForm />
        </div>

        <Typography variant="badge" className="text-center text-ink-muted">
          New to {SITE.name}?{" "}
          <Link
            href={ROUTES.onboarding}
            className="rounded-chip font-medium text-brand underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-brand/60"
          >
            Get started
          </Link>
        </Typography>
      </div>
    </section>
  </>
)

export default LoginPage
