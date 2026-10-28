"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import CarouselArrows from "@/components/landing/primitives/CarouselArrows"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import Typography from "@/components/ui/Typography"
import type { Insight, SectionIntro } from "@/lib/landing/types"

type InsightsGalleryProps = {
  intro: SectionIntro
  items: Insight[]
}

const GALLERY_ID = "insights-gallery"

// Desktop: an expanding strip gallery — the active article takes the wide
// slot (927px of 1528 in Figma) and the rest collapse to 184px strips; the
// caption below follows the active one. Below lg it falls back to a
// snap-scrolling row of cards with their own captions.
const InsightsGallery = ({ intro, items }: InsightsGalleryProps) => {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const current = items[active]

  const select = (index: number) => {
    const next = (index + items.length) % items.length
    setActive(next)

    // Keep the mobile row in step with the arrows.
    const list = listRef.current
    const item = list?.children[next] as HTMLElement | undefined
    if (list && item && list.scrollWidth > list.clientWidth) {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
      list.scrollTo({
        left: item.offsetLeft - (list.children[0] as HTMLElement).offsetLeft,
        behavior: reduce ? "auto" : "smooth",
      })
    }
  }

  return (
    <>
      <SectionHeader
        intro={intro}
        titleId="insights-title"
        actions={
          <CarouselArrows
            variant="compact"
            label="article"
            controls={GALLERY_ID}
            onPrev={() => select(active - 1)}
            onNext={() => select(active + 1)}
            canPrev={items.length > 1}
            canNext={items.length > 1}
          />
        }
      />

      <ul
        ref={listRef}
        id={GALLERY_ID}
        className="relative mt-section-content -mr-gutter flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pr-gutter lg:mr-0 lg:h-[clamp(22rem,32.4vw,35rem)] lg:snap-none lg:gap-5 lg:overflow-visible lg:pr-0"
      >
        {items.map((item, index) => {
          const isActive = index === active

          return (
            <li
              key={item.title}
              data-active={isActive}
              className="w-[82%] shrink-0 snap-start motion-reduce:transition-none sm:w-[60%] lg:w-auto lg:min-w-0 lg:shrink lg:grow-[184] lg:basis-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-emphasized lg:data-[active=true]:grow-[927]"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                aria-label={`Show “${item.title}”`}
                className="group/strip relative block aspect-[4/5] w-full overflow-hidden rounded-photo outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 lg:aspect-auto lg:h-full"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1728px) 927px, (min-width: 1024px) 54vw, 82vw"
                  className="object-cover transition-transform duration-700 ease-emphasized group-hover/strip:scale-[1.03] motion-reduce:transition-none"
                />
              </button>

              <div className="mt-4 lg:hidden">
                <Typography variant="titleSm">
                  <Link href={item.href} className="hover:text-brand">
                    {item.title}
                  </Link>
                </Typography>
                <Typography variant="bodyLg" className="mt-2 opacity-80">
                  {item.excerpt}
                </Typography>
              </div>
            </li>
          )
        })}
      </ul>

      {current ? (
        <div aria-live="polite" className="mt-7 hidden lg:block">
          <Typography as="h3" variant="titleSm">
            <Link
              href={current.href}
              className="rounded-badge outline-none hover:text-brand focus-visible:ring-[3px] focus-visible:ring-brand/60"
            >
              {current.title}
            </Link>
          </Typography>
          <Typography variant="bodyLg" className="mt-2 opacity-80">
            {current.excerpt}
          </Typography>
        </div>
      ) : null}
    </>
  )
}

export default InsightsGallery
