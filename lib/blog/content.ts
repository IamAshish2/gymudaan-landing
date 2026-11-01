// Blogs page copy and posts (Figma frame 1:1249). The contract has no blog
// endpoints yet (docs/API.md, Gaps), so posts live here until it does.
//
// TODO(content): every post below is placeholder content from Figma, and
// there are no article bodies or article pages yet, so cards do not link
// anywhere. Three grid posts appear twice because Figma repeats them, and
// some dates are in the future.

import type { BlogPost } from "@/lib/blog/types"
import checklist from "@/public/landing/blog/checklist.webp"
import dashboardLaptop from "@/public/landing/blog/dashboard-laptop.webp"
import featuredImage from "@/public/landing/blog/featured.webp"
import megaphone from "@/public/landing/blog/megaphone.webp"
import revenueCoins from "@/public/landing/blog/revenue-coins.webp"

export const ALL_CATEGORIES = "All"

export const blogIntro = {
  badge: "Blogs & Insights",
  title: "Insights & Tips to Grow Your Fitness Business",
  description:
    "Discover gym management tips, fitness trends, and insights to grow your business.",
}

export const categories = [
  ALL_CATEGORIES,
  "Management",
  "Growth",
  "Retention",
  "Fitness",
  "Updates",
  "Guides",
]

export const blogText = {
  searchLabel: "Search articles",
  searchPlaceholder: "Search article",
  categoriesLabel: "Filter articles by category",
  loadMore: "Load More",
  empty: "No articles found. Try another category or search term.",
}

const megaphoneCrop =
  "absolute top-[-3.73%] left-[-2.37%] h-[103.73%] w-[135.05%] max-w-none"
const coinsCrop =
  "absolute top-[-0.07%] left-[-14.55%] h-[74.11%] w-[121.04%] max-w-none"

const kushal = { author: "Kushal Jk", date: "Aug 26, 2026" }

export const featuredPost: BlogPost & { excerpt: string } = {
  id: "manage-gym-efficiently",
  title: "7 Tips to Manage Your Gym More Efficiently",
  category: "Management",
  ...kushal,
  excerpt:
    "Discover how smart gym software simplifies daily operations, tracks performance, and drives business growth.",
  image: { src: featuredImage },
}

export const sidePosts: BlogPost[] = [
  {
    id: featuredPost.id,
    title: featuredPost.title,
    category: featuredPost.category,
    ...kushal,
  },
  {
    id: "grow-your-gym-business",
    title: "How to Grow Your Gym Business in 2026",
    category: "Management",
    ...kushal,
  },
  {
    id: "improve-member-retention",
    title: "5 Ways to Improve Gym Member Retention",
    category: "Management",
    ...kushal,
  },
  {
    id: "fitness-industry-trends",
    title: "Top Fitness Industry Trends to Watch in 2026",
    category: "Management",
    ...kushal,
  },
]

const softwarePost = {
  title: "Why Every Modern Gym currently Needs Management Software",
  category: "Fitness",
  author: "Rupesh Thapa",
  date: "Oct 27, 2026",
  image: { src: dashboardLaptop },
}

const socialPost = {
  title: "Social Media Marketing Tips for Gym Owners",
  category: "Marketing",
  author: "Amick Khadka",
  date: "Nov 18, 2026",
}

const revenuePost = {
  title: "6 Smart Ways to Increase Your Gym Revenue",
  category: "Growth",
  author: "Ashish Karki",
  date: "Nov 28, 2026",
  image: { src: revenueCoins, cropClassName: coinsCrop },
}

export const gridPosts: BlogPost[] = [
  { id: "modern-gym-software", ...softwarePost },
  {
    id: "social-media-tips",
    ...socialPost,
    image: { src: megaphone, cropClassName: megaphoneCrop },
  },
  { id: "increase-gym-revenue", ...revenuePost },
  { id: "modern-gym-software-2", ...softwarePost },
  {
    id: "social-media-tips-2",
    ...socialPost,
    image: { src: checklist },
  },
  { id: "increase-gym-revenue-2", ...revenuePost },
]
