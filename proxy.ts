import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/constants"
import { ROUTES } from "@/lib/routes"

// Optimistic cookie-presence check only, NOT a security boundary — real
// enforcement is requireRole() (getSessionUser + /auth/me) in layouts/actions, then the API's JWT check.

export const proxy = (request: NextRequest) => {
  const hasToken = request.cookies.has(ACCESS_TOKEN_COOKIE)
  if (hasToken) return NextResponse.next()

  return NextResponse.redirect(new URL(ROUTES.home, request.url))
}

export const config = {
  // Static literals required as dynamic values are ignored at build time.
  // Keep in sync with ROUTES.dashboard.root, ROUTES.admin.root, ROUTES.account.root.
  matcher: ["/dashboard/:path*", "/admin/:path*", "/account/:path*"],
}
