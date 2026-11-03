import type { Metadata } from "next"

import BlogExplorer from "@/components/blog/BlogExplorer"
import PageIntro from "@/components/landing/primitives/PageIntro"
import ThreadsGreeting from "@/components/landing/primitives/ThreadsGreeting"
import Testimonials from "@/components/landing/sections/Testimonials"
import { blogIntro } from "@/lib/blog/content"
import { ROUTES } from "@/lib/routes"
import { pageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = pageMetadata({
  path: ROUTES.blogs,
  title: "Blogs",
  description: blogIntro.description,
})

// Section order follows Figma frame 1:1249.
const BlogsPage = () => (
  <>
    <PageIntro
      backdrop={<ThreadsGreeting />}
      badge={blogIntro.badge}
      title={blogIntro.title}
      description={blogIntro.description}
    />
    <BlogExplorer />
    <Testimonials />
  </>
)

export default BlogsPage
