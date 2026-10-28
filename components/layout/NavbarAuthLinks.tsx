import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/routes"

const NavbarAuthLinks = () => (
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" asChild>
      <Link href={ROUTES.auth.login}>Sign in</Link>
    </Button>
    <Button size="sm" asChild>
      <Link href={ROUTES.auth.register}>Get started</Link>
    </Button>
  </div>
)

export default NavbarAuthLinks
