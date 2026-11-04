// Brand + SEO copy in one place — the root layout, shells, auth and error
// pages all read from here. Rename the app by editing this file.
import { ROUTES } from "@/lib/routes"

export const SITE = {
  name: "Gym Udaan",
  tagline: "Smarter gym management. Stronger fitness businesses.",
  description:
    "Gym Udaan is the gym management platform for modern fitness businesses in Nepal: members, memberships, attendance, payments and reports in one place.",
  loginUrl: ROUTES.login,
  contact: {
    whatsappUrl: "https://wa.me/9779705001112",
    /** The same sales/support number as the WhatsApp link (live site footer). */
    phone: "+977-9705001112",
    email: "sales@gymudaan.com",
    location: "Itahari, Nepal",
  },
  // Gym Udaan is operated by this company (named in lib/legal/terms.ts and on
  // the live site's terms page).
  operator: {
    name: "Udaan Tech Solution Pvt. Ltd.",
    url: "https://www.udaantechsolution.com",
  },
  // The official profiles linked from the live www.gymudaan.com footer
  // (checked 2026-11-03). Also used as Organization `sameAs` in JSON-LD.
  // TODO(content): owner to confirm these remain the official accounts.
  socials: {
    tiktok: "https://www.tiktok.com/@gymudaan",
    instagram: "https://www.instagram.com/gymudaannepal/",
    facebook: "https://www.facebook.com/profile.php?id=61590425726116",
  },
} as const

// Off-site links open in a new tab; in-app links pass nothing extra.
export const linkTarget = (href: string) =>
  href.startsWith("http")
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {}
