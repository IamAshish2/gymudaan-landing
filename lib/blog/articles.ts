// Article bodies for the blog detail page. Like the posts in content.ts these
// are static until the API grows blog endpoints (docs/API.md, Gaps).
//
// TODO(content): placeholder copy written for the layout; replace with the
// final article before launch.

import { featuredPost, gridPosts, sidePosts } from "@/lib/blog/content"
import type { BlogArticle, BlogPost } from "@/lib/blog/types"
import type { SectionIntro } from "@/lib/landing/types"

export const articleText = {
  backLabel: "All articles",
  readTime: (minutes: number) => `${minutes} min read`,
}

export const relatedIntro: SectionIntro = {
  badge: "Blogs & Insights",
  title: ["Keep ", { em: "Reading" }],
  description: "More ideas for running a sharper, busier gym.",
}

const WORDS_PER_MINUTE = 220

const articles: BlogArticle[] = [
  {
    // Placeholder copy (see the TODO above): not published until replaced.
    published: false,
    post: featuredPost,
    related: [
      "modern-gym-software",
      "social-media-tips",
      "increase-gym-revenue",
    ],
    sections: [
      {
        id: "introduction",
        label: "Introduction",
        title: "Running a gym is more than running workouts",
        blocks: [
          {
            kind: "text",
            text: "Behind every busy floor there is a long list of jobs nobody sees: chasing renewals, counting cash at closing, answering the same questions on WhatsApp, and working out why last month felt slower than the one before. None of it is why you opened a gym, and all of it eats into the time you could spend with members.",
          },
          {
            kind: "text",
            text: "The good news is that most of that work follows patterns. Once you can see the patterns, you can simplify them, hand them to a system, or drop them. Here are seven changes that make the biggest difference for gyms of every size.",
          },
        ],
      },
      {
        id: "check-ins",
        label: "Automate check-ins",
        title: "1. Automate member check-ins",
        blocks: [
          {
            kind: "text",
            text: "A paper register or a front-desk spreadsheet works until the evening rush. Then it becomes a queue, a guess, and a gap in your records. Digital check-ins, by QR code, card or phone, record every visit without anyone writing it down.",
          },
          {
            kind: "text",
            text: "The real win comes later: once every visit is recorded, you can see peak hours, spot members who have stopped coming, and staff the floor around real demand instead of instinct.",
          },
        ],
      },
      {
        id: "renewals",
        label: "Put renewals on autopilot",
        title: "2. Put renewals and payment reminders on autopilot",
        blocks: [
          {
            kind: "text",
            text: "Expired memberships rarely end because members decide to leave. Most simply lapse because no one reminded them. Set up automatic reminders a week before, on the day, and a few days after a plan expires.",
          },
          {
            kind: "list",
            items: [
              "Send the first reminder seven days before expiry, while there is still time to renew.",
              "Include the plan, the amount due and a way to pay without visiting the desk.",
              "Follow up once after expiry with a friendly, personal note rather than a demand.",
            ],
          },
        ],
      },
      {
        id: "daybook",
        label: "Keep a daily daybook",
        title: "3. Close every day with a clean daybook",
        blocks: [
          {
            kind: "text",
            text: "Cash, card and online payments, plus the small expenses that disappear into a drawer, should all land in one place each day. A daily daybook takes minutes when it is part of your software and hours when it is a weekend catch-up job.",
          },
          {
            kind: "callout",
            title: "Quick win",
            text: "Pick one person to close the books each night and give them a fixed five-minute routine. Consistency matters more than detail.",
          },
        ],
      },
      {
        id: "retention",
        label: "Watch for drop-off",
        title: "4. Spot members before they drift away",
        blocks: [
          {
            kind: "text",
            text: "A member who used to train four times a week and now comes once is telling you something. Attendance trends are the earliest warning you get, often weeks before a cancellation.",
          },
          {
            kind: "quote",
            text: "Keeping a member you already have is far cheaper than winning a new one. Retention is the growth strategy most gyms overlook.",
          },
          {
            kind: "text",
            text: "Review a short list of low-attendance members every week and have a trainer reach out personally. A simple “we missed you” message brings more people back than any discount.",
          },
        ],
      },
      {
        id: "communication",
        label: "Centralise communication",
        title: "5. Keep member communication in one place",
        blocks: [
          {
            kind: "text",
            text: "Announcements spread across personal phones, group chats and notice boards get missed. Bulk messaging from one system means holiday hours, new classes and offers reach every member, and the conversation stays with the gym when staff change.",
          },
        ],
      },
      {
        id: "staff",
        label: "Give staff clear roles",
        title: "6. Give your staff clear roles and access",
        blocks: [
          {
            kind: "text",
            text: "When everyone can do everything, mistakes are hard to trace and nobody feels responsible. Define who handles payments, who manages members and who sees the reports, and set access to match.",
          },
          {
            kind: "list",
            items: [
              "Front desk: check-ins, new members and renewals.",
              "Trainers: attendance and member progress.",
              "Owners and managers: revenue, expenses and reports.",
            ],
          },
        ],
      },
      {
        id: "reports",
        label: "Decide with data",
        title: "7. Make decisions from reports, not guesswork",
        blocks: [
          {
            kind: "text",
            text: "Which plans sell best? Which months are slow? How much does each new member cost you to win? A short monthly review of revenue, attendance and renewals answers these questions and turns hunches into decisions you can stand behind.",
          },
        ],
      },
      {
        id: "final-thoughts",
        label: "Final thoughts",
        title: "Start small, then build the habit",
        blocks: [
          {
            kind: "text",
            text: "You do not need to change everything at once. Pick the tip that would save you the most time this month, make it part of your routine, then move to the next. Within a season, the gym runs smoother and you get back the hours that matter most: the ones spent with your members.",
          },
        ],
      },
    ],
  },
]

export const articleSlugs = articles.map((article) => article.post.id)

/** Slugs of published articles: the only ones listed in the sitemap. */
export const publishedArticleSlugs = articles
  .filter((article) => article.published)
  .map((article) => article.post.id)

/** True once at least one real article is live, so /blogs can be indexed. */
export const hasPublishedArticles = publishedArticleSlugs.length > 0

export const getArticle = (slug: string): BlogArticle | undefined =>
  articles.find((article) => article.post.id === slug)

const allPosts: BlogPost[] = [featuredPost, ...sidePosts, ...gridPosts]

export const getRelatedPosts = (article: BlogArticle): BlogPost[] =>
  article.related.flatMap((id) => {
    const post = allPosts.find((candidate) => candidate.id === id)
    return post ? [post] : []
  })

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length

export const readingMinutes = (article: BlogArticle): number => {
  const words = article.sections.reduce(
    (total, section) =>
      total +
      countWords(section.title) +
      section.blocks.reduce((sum, block) => {
        switch (block.kind) {
          case "list":
            return sum + countWords(block.items.join(" "))
          case "callout":
            return sum + countWords(`${block.title} ${block.text}`)
          default:
            return sum + countWords(block.text)
        }
      }, 0),
    0
  )

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
