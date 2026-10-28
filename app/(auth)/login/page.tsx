import { Suspense } from "react"
import type { Metadata } from "next"

import LoginForm from "@/components/auth/LoginForm"
import { sanitizeNextPath } from "@/lib/routes"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to your ${SITE.name} account`,
}

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>
}

// Reads searchParams (dynamic API) — must be inside <Suspense> so the static
// shell can still pre-render immediately (PPR).
const LoginPageContent = async ({ searchParams }: LoginPageProps) => {
  const { next } = await searchParams

  return <LoginForm next={sanitizeNextPath(next)} />
}

const LoginPage = (props: LoginPageProps) => {
  return (
    <Suspense fallback={<LoginForm disabled />}>
      <LoginPageContent {...props} />
    </Suspense>
  )
}

export default LoginPage
