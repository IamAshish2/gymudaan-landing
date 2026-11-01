// Brand + SEO copy in one place — the root layout, shells, auth and error
// pages all read from here. Rename the app by editing this file.
export const SITE = {
  name: "Gym Udaan",
  tagline: "Smarter gym management. Stronger fitness businesses.",
  description:
    "Gym Udaan is the gym management platform for modern fitness businesses in Nepal: members, memberships, attendance, payments and reports in one place.",
  contact: {
    whatsappUrl: "https://wa.me/9779705001112",
    email: "sales@gymudaan.com",
    location: "Itahari, Nepal",
  },
  // TODO(content): template links from the Figma footer — replace with the
  // real social profiles before launch.
  socials: {
    x: "https://x.com",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com",
    youtube: "https://www.youtube.com",
  },
} as const

// Off-site links open in a new tab; in-app links pass nothing extra.
export const linkTarget = (href: string) =>
  href.startsWith("http")
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {}
