// Search titles and descriptions for every indexable marketing page, in one
// place so they can be reviewed together. Titles get the root "%s | Gym Udaan"
// template unless marked absolute. Descriptions aim for ~150–160 characters.
//
// Only facts both the live site and this site's own copy state: members,
// memberships, attendance, payments and reports, for gyms in Nepal. No
// superlatives, counts or prices until the business confirms them.

type PageSeo = {
  title: string
  description: string
  /** The title is used as is, without the " | Gym Udaan" suffix. */
  absoluteTitle?: boolean
}

export const PAGE_SEO = {
  home: {
    title: "Gym Management Software in Nepal | Gym Udaan",
    description:
      "Gym Udaan is gym management software for gyms and fitness centers in Nepal. Manage members, memberships, attendance, payments and reports in one place.",
    absoluteTitle: true,
  },
  pricing: {
    title: "Gym Management Software Pricing in Nepal",
    // The price matches the Standard plan card (lib/pricing/content.ts).
    description:
      "Gym Udaan plans for gyms in Nepal from NPR 14,999 a year. Compare Standard, Gold and Platinum: members, attendance, finance, access control and more.",
  },
  about: {
    title: "About Us: Gym Management Software Made in Nepal",
    description:
      "Gym Udaan is gym management software built in Itahari, Nepal by Udaan Tech Solution Pvt. Ltd. Members, memberships, attendance, payments and reports in one place.",
  },
  blogs: {
    title: "Gym Management Tips and Guides",
    description:
      "Articles for gym and fitness business owners on managing memberships, attendance, payments and member retention, and on growing a gym.",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How Gym Udaan collects, uses and protects personal information across its gym management app and website, and the rights you have over your data.",
  },
  terms: {
    title: "Terms of Service",
    description:
      "The terms that govern your use of Gym Udaan, including accounts, connected Facebook, Instagram and TikTok accounts, subscriptions, billing and cancellation.",
  },
} as const satisfies Record<string, PageSeo>
