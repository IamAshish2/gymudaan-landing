import type { Metadata } from "next"

import BlogExplorer from "@/components/blog/BlogExplorer"
import PageIntro from "@/components/landing/primitives/PageIntro"
import Testimonials from "@/components/landing/sections/Testimonials"
import { blogIntro } from "@/lib/blog/content"

export const metadata: Metadata = {
  title: "Blogs",
  description: blogIntro.description,
}

// Section order follows Figma frame 1:1249.
const BlogsPage = () => (
  <>
    <PageIntro
      badge={blogIntro.badge}
      title={blogIntro.title}
      description={blogIntro.description}
    />
    <BlogExplorer />
    <Testimonials />
  </>
)

export default BlogsPage
