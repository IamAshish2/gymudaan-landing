import { Inter } from "next/font/google"
import Image from "next/image"

import AutoplayVideo from "@/components/landing/primitives/AutoplayVideo"
import Section from "@/components/landing/primitives/Section"
import SnapCarousel from "@/components/landing/primitives/SnapCarousel"
import Typography from "@/components/ui/Typography"
import { testimonials } from "@/lib/landing/content"
import type { TestimonialTile } from "@/lib/landing/types"
import { cn } from "@/lib/utils"

// Figma sets the quotes in Inter; the rest of the site is Poppins.
const quoteFont = Inter({ subsets: ["latin"], weight: "400" })

// Each slide is a size container, so 100cqw is the card width. Cards are
// 392×524 in proportion (Figma's 392×476, 10% taller); slides in the track
// stretch to the tallest, so a long quote grows the row and photo and video
// cards grow with it.
const tileClass =
  "relative flex h-full min-h-[calc(100cqw*1.3357)] w-full overflow-hidden rounded-card"

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

const Tile = ({ tile }: { tile: TestimonialTile }) => {
  // A landscape clip cropped to the portrait card; the speaker stays centred.
  if (tile.kind === "video") {
    return (
      <div className={tileClass}>
        <AutoplayVideo
          src={tile.src}
          poster={tile.poster}
          label={tile.label}
          sound
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    )
  }

  if (tile.kind === "photo") {
    return (
      <div className={tileClass}>
        <Image
          src={tile.image}
          alt={tile.alt}
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <figure
      className={cn(
        tileClass,
        "flex-col justify-between gap-8 bg-surface-card p-6 shadow-edge lg:p-8"
      )}
    >
      <div className="flex flex-col gap-6">
        {tile.avatar ? (
          <Image
            src={tile.avatar}
            alt=""
            className="size-10 rounded-full object-cover lg:size-12.75"
          />
        ) : (
          <span
            aria-hidden
            className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-badge font-medium text-brand lg:size-12.75"
          >
            {initials(tile.name)}
          </span>
        )}
        <blockquote className={cn("text-quote", quoteFont.className)}>
          “{tile.quote}”
        </blockquote>
      </div>
      <figcaption className="flex flex-col gap-2">
        <Typography as="span" variant="titleSm" className="leading-7">
          {tile.name}
        </Typography>
        <Typography
          as="span"
          variant="bodyLg"
          className="leading-7 font-medium opacity-80"
        >
          {tile.role}
        </Typography>
      </figcaption>
    </figure>
  )
}

// A carousel like Who We Serve: header arrows, swipe or keyboard. The track
// stays inside the container; four cards show at a time from xl, three on
// small laptops (lg), two on
// tablets, one and a peek on phones. Even slides drop 40px from lg (the
// Figma stagger), so the track keeps room below for them.
const Testimonials = () => (
  <Section id="testimonials" labelledBy="testimonials-title">
    <SnapCarousel
      intro={testimonials}
      titleId="testimonials-title"
      id="testimonials-track"
      label="testimonials"
      arrows="dark"
      trackClassName="gap-5 lg:pb-10"
      slideClassName="@container basis-[82%] sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)] lg:even:translate-y-10 xl:basis-[calc((100%-3.75rem)/4)]"
    >
      {testimonials.tiles.map((tile, index) => (
        <Tile key={index} tile={tile} />
      ))}
    </SnapCarousel>
  </Section>
)

export default Testimonials
