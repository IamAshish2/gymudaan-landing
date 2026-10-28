import NavbarAuthLinks from "@/components/layout/NavbarAuthLinks"
import NavbarUserMenu from "@/components/layout/NavbarUserMenu"
import { getSessionUser } from "@/lib/auth/get-session-user"

// Reads cookies — always render inside <Suspense> so the shell stays static.
const NavbarUserSection = async () => {
  const user = await getSessionUser()

  if (user) {
    return <NavbarUserMenu user={user} />
  }

  return <NavbarAuthLinks />
}

export default NavbarUserSection
