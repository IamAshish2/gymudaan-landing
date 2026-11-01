import Image from "next/image"

import Typography from "@/components/ui/Typography"
import type { BlogPost } from "@/lib/blog/types"
import { cn } from "@/lib/utils"

const PostByline = ({ post }: { post: BlogPost }) => (
  <Typography variant="body" className="opacity-60">
    {post.author} | {post.date}
  </Typography>
)

const PostCategory = ({ post }: { post: BlogPost }) => (
  <Typography variant="body" className="opacity-60">
    {post.category}
  </Typography>
)

type FeaturedCardProps = {
  post: BlogPost & { excerpt: string }
}

// The large lead story (node 1:1315): 839×733 with a 497px image on top.
export const BlogFeaturedCard = ({ post }: FeaturedCardProps) => (
  <article className="flex h-full flex-col overflow-hidden rounded-panel border border-line-dark">
    {post.image ? (
      <div className="relative aspect-839/497 w-full border-b border-line-dark">
        <Image
          src={post.image.src}
          alt=""
          fill
          preload
          sizes="(min-width: 1728px) 839px, (min-width: 1024px) 48vw, 92vw"
          className="object-cover"
        />
      </div>
    ) : null}
    <div className="flex flex-1 flex-col px-5 py-5 lg:px-8.5 lg:pt-5.5 lg:pb-7.5">
      <PostCategory post={post} />
      <Typography as="h2" variant="titleSm" className="mt-1">
        {post.title}
      </Typography>
      <Typography variant="bodyLg" className="mt-3 max-w-172">
        {post.excerpt}
      </Typography>
      <div className="mt-3 lg:mt-4">
        <PostByline post={post} />
      </div>
    </div>
  </article>
)

// A text-only card (node 1:1291). Used beside the lead story, and in filtered
// results for posts that have no image.
export const BlogCompactCard = ({ post }: { post: BlogPost }) => (
  <article className="flex h-full flex-col justify-center gap-1 rounded-panel border border-line-dark px-5 py-5 lg:gap-2 lg:px-7.75">
    <PostCategory post={post} />
    <Typography as="h2" variant="titleSm">
      {post.title}
    </Typography>
    <PostByline post={post} />
  </article>
)

// Image on top, text below (node 1:1328).
export const BlogGridCard = ({ post }: { post: BlogPost }) => (
  <article>
    {post.image ? (
      <div className="relative aspect-496/369 w-full overflow-hidden rounded-card border border-line-dark">
        <Image
          src={post.image.src}
          alt=""
          fill={!post.image.cropClassName}
          sizes="(min-width: 1728px) 496px, (min-width: 768px) 33vw, 92vw"
          className={cn(post.image.cropClassName ?? "object-cover")}
        />
      </div>
    ) : null}
    <div className="flex flex-col gap-1 px-0.75 pt-5">
      <PostCategory post={post} />
      <Typography as="h2" variant="titleSm">
        {post.title}
      </Typography>
      <PostByline post={post} />
    </div>
  </article>
)
