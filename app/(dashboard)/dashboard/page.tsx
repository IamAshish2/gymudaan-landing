import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import GridContainer from "@/components/ui/GridContainer"
import Typography from "@/components/ui/Typography"
import { requireRole } from "@/lib/auth/permissions"
import { IArrowRight } from "@/lib/icons"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
}

const NEXT_STEPS = [
  {
    title: "Your account",
    description: "Check the details tied to your sign-in.",
    href: ROUTES.account.root,
    cta: "Open account",
  },
  {
    title: "Security",
    description: "Change your password and sign out other devices.",
    href: ROUTES.account.security,
    cta: "Update password",
  },
  {
    title: "Rich text editor",
    description: "Try the editor and see its server-sanitized output.",
    href: ROUTES.dashboard.editor,
    cta: "Open editor",
  },
] as const

const DashboardPage = async () => {
  const user = await requireRole("USER")

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <Typography variant="h2" as="h1">
          Welcome back
        </Typography>
        <Typography variant="muted">Signed in as {user.email}</Typography>
      </div>

      <GridContainer className="gap-4 md:gap-6">
        {NEXT_STEPS.map((step) => (
          <Card key={step.href} className="col-span-4">
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button variant="outline" size="sm" asChild>
                <Link href={step.href}>
                  {step.cta}
                  <IArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </GridContainer>
    </div>
  )
}

export default DashboardPage
