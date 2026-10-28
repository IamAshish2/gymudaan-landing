import Image from "next/image"

import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import Typography from "@/components/ui/Typography"
import { testimonials } from "@/lib/landing/content"
import type { TestimonialTile } from "@/lib/landing/types"
import { cn } from "@/lib/utils"

// Tiles are 392×476 in Figma. Width comes from --tile-w (set on the list);
// quote tiles keep that height as a minimum and grow if the quote needs it.
const tileClass =
  "relative flex w-(--tile-w) shrink-0 snap-start overflow-hidden rounded-card lg:even:mt-10"
const tileHeight = "h-[calc(var(--tile-w)*1.2143)]"
const tileMinHeight = "min-h-[calc(var(--tile-w)*1.2143)]"

const Tile = ({ tile }: { tile: TestimonialTile }) => {
  if (tile.kind === "photo") {
    return (
      <li className={cn(tileClass, tileHeight)}>
        <Image
          src={tile.image}
          alt={tile.alt}
          fill
          sizes="(min-width: 640px) 392px, 78vw"
          className="object-cover"
        />
      </li>
    )
  }

  return (
    <li className={cn(tileClass, tileMinHeight)}>
      <figure className="flex flex-1 flex-col justify-between gap-8 bg-surface-card p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          <Image
            src={tile.avatar}
            alt=""
            className="size-10 rounded-full object-cover lg:size-12.75"
          />
          <blockquote className="text-quote">“{tile.quote}”</blockquote>
        </div>
        <figcaption className="flex flex-col gap-2">
          <Typography as="span" variant="titleSm">
            {tile.name}
          </Typography>
          <Typography
            as="span"
            variant="bodyLg"
            className="font-medium opacity-80"
          >
            {tile.role}
          </Typography>
        </figcaption>
      </figure>
    </li>
  )
}

// Staggered tiles (even ones drop 40px on desktop) in a snap-scrolling row
// that bleeds off the right edge like the Figma frame.
const Testimonials = () => (
  <Section
    id="testimonials"
    labelledBy="testimonials-title"
    className="pt-[calc(var(--spacing-section)*0.7)]"
  >
    <SectionHeader intro={testimonials} titleId="testimonials-title" />

    <ul
      tabIndex={0}
      aria-label="Customer testimonials"
      className="mt-section-content -mr-gutter flex snap-x snap-mandatory items-start gap-5 overflow-x-auto overscroll-x-contain pr-gutter outline-none [--tile-w:78vw] focus-visible:ring-[3px] focus-visible:ring-brand/60 sm:[--tile-w:22rem] lg:[--tile-w:min(24.5rem,max(19rem,22.7vw))]"
    >
      {testimonials.tiles.map((tile, index) => (
        <Tile key={index} tile={tile} />
      ))}
    </ul>
  </Section>
)

export default Testimonials
