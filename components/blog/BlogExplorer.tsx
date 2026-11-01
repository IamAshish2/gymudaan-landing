"use client"

import { useState } from "react"
import Image from "next/image"

import {
  BlogCompactCard,
  BlogFeaturedCard,
  BlogGridCard,
} from "@/components/blog/BlogCards"
import Container from "@/components/landing/primitives/Container"
import LandingButton from "@/components/landing/primitives/LandingButton"
import Typography from "@/components/ui/Typography"
import {
  ALL_CATEGORIES,
  blogText,
  categories,
  featuredPost,
  gridPosts,
  sidePosts,
} from "@/lib/blog/content"
import { cn } from "@/lib/utils"
import arrowDown from "@/public/landing/blog/arrow-down.svg"
import searchIcon from "@/public/landing/blog/search.svg"

const POSTS_PER_LOAD = 6

const gridClass = "grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3"

// Filtering runs on the client because posts are static content, with no API
// to page through. Once a blog endpoint exists, move category, query and page
// into the URL as the other paginated lists do.
const BlogExplorer = () => {
  const [category, setCategory] = useState(ALL_CATEGORIES)
  const [query, setQuery] = useState("")
  const [visible, setVisible] = useState(POSTS_PER_LOAD)

  const search = query.trim().toLowerCase()
  const isFiltering = category !== ALL_CATEGORIES || search !== ""

  const posts = isFiltering
    ? [...sidePosts, ...gridPosts].filter(
        (post) =>
          (category === ALL_CATEGORIES || post.category === category) &&
          post.title.toLowerCase().includes(search)
      )
    : gridPosts

  const selectCategory = (next: string) => {
    setCategory(next)
    setVisible(POSTS_PER_LOAD)
  }

  const changeQuery = (next: string) => {
    setQuery(next)
    setVisible(POSTS_PER_LOAD)
  }

  return (
    <section aria-label="Articles" className="pt-15 text-white lg:pt-29">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label={blogText.categoriesLabel}
            className="-mr-gutter flex items-center gap-1 overflow-x-auto pr-gutter lg:mr-0 lg:pr-0"
          >
            {categories.map((item) => {
              const selected = item === category

              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectCategory(item)}
                  className={cn(
                    "shrink-0 rounded-chip px-2.5 py-1 text-card-title font-medium transition-colors duration-300 ease-standard outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60",
                    selected
                      ? "bg-surface-card font-normal"
                      : "hover:text-brand"
                  )}
                >
                  {item}
                </button>
              )
            })}
          </div>

          <label className="flex h-10 w-full items-center gap-2 rounded-full border border-line-dark px-4 transition-colors duration-300 ease-standard focus-within:border-white/40 lg:w-68.75">
            <Image src={searchIcon} alt="" />
            <span className="sr-only">{blogText.searchLabel}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => changeQuery(event.target.value)}
              placeholder={blogText.searchPlaceholder}
              className="w-full min-w-0 bg-transparent text-badge outline-none placeholder:text-white"
            />
          </label>
        </div>

        <p role="status" className="sr-only">
          {isFiltering ? `${posts.length} articles found` : ""}
        </p>

        {isFiltering ? null : (
          <div className="mt-7.5 grid gap-6 lg:mt-15 lg:grid-cols-[839fr_647fr] lg:gap-11">
            <BlogFeaturedCard post={featuredPost} />
            <ul className="grid gap-5 lg:grid-rows-4 lg:gap-6.75">
              {sidePosts.map((post) => (
                <li key={post.id}>
                  <BlogCompactCard post={post} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {posts.length > 0 ? (
          <ul
            className={cn(
              gridClass,
              isFiltering ? "mt-7.5 lg:mt-15" : "mt-section"
            )}
          >
            {posts.slice(0, visible).map((post) => (
              <li key={post.id}>
                {post.image ? (
                  <BlogGridCard post={post} />
                ) : (
                  <BlogCompactCard post={post} />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="bodyLg" className="mt-15 text-center opacity-80">
            {blogText.empty}
          </Typography>
        )}

        {posts.length > visible ? (
          <div className="mt-10 flex justify-center lg:mt-15">
            <LandingButton
              variant="link"
              size="inline"
              onClick={() => setVisible(visible + POSTS_PER_LOAD)}
            >
              {blogText.loadMore}
              <Image src={arrowDown} alt="" className="rotate-90" />
            </LandingButton>
          </div>
        ) : null}
      </Container>
    </section>
  )
}

export default BlogExplorer
