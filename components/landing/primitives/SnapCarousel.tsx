"use client"

import { Children, useEffect, type ReactNode } from "react"

import CarouselArrows from "@/components/landing/primitives/CarouselArrows"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import {
  CAROUSEL_ADVANCE_EVENT,
  useSnapCarousel,
} from "@/hooks/use-snap-carousel"
import type { SectionIntro, Tone } from "@/lib/landing/types"
import { cn } from "@/lib/utils"

type SnapCarouselProps = {
  intro: SectionIntro
  titleId: string
  /** Id of the scroll region; the arrows reference it via aria-controls. */
  id: string
  /** Plural noun for the arrow labels, e.g. "services". */
  label: string
  tone?: Tone
  arrows: "dark" | "light"
  titleClassName?: string
  /** Classes for the scroll track (gap, padding, bleed). */
  trackClassName?: string
  /** Classes for every slide wrapper; style the active one with data-active. */
  slideClassName?: string
  /**
   * Move on when a slide fires CAROUSEL_ADVANCE_EVENT (its video ended),
   * wrapping from the last slide back to the first.
   */
  autoAdvance?: boolean
  /** Server-rendered slide contents, one child per slide. */
  children: ReactNode
}

// Section header with prev/next arrows driving a native scroll-snap track.
// Swipe, trackpad and arrow-key scrolling (when the track is focused) come
// from the browser; the arrows move one slide at a time.
const SnapCarousel = ({
  intro,
  titleId,
  id,
  label,
  tone = "dark",
  arrows,
  titleClassName,
  trackClassName,
  slideClassName,
  autoAdvance = false,
  children,
}: SnapCarouselProps) => {
  const {
    scrollerRef,
    index,
    count,
    canPrev,
    canNext,
    prev,
    next,
    scrollToIndex,
  } = useSnapCarousel()
  const slides = Children.toArray(children)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!autoAdvance || !scroller || count < 2) return undefined

    const onAdvance = (event: Event) => {
      event.preventDefault()
      scrollToIndex(index >= count - 1 ? 0 : index + 1)
    }
    scroller.addEventListener(CAROUSEL_ADVANCE_EVENT, onAdvance)
    return () => scroller.removeEventListener(CAROUSEL_ADVANCE_EVENT, onAdvance)
  }, [autoAdvance, count, index, scrollToIndex, scrollerRef])

  return (
    <>
      <SectionHeader
        intro={intro}
        titleId={titleId}
        tone={tone}
        titleClassName={titleClassName}
        actions={
          <CarouselArrows
            variant={arrows}
            label={label}
            controls={id}
            onPrev={prev}
            onNext={next}
            canPrev={canPrev}
            canNext={canNext}
          />
        }
      />

      <div
        ref={scrollerRef}
        id={id}
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={titleId}
        tabIndex={0}
        className={cn(
          "relative mt-section-content flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-safe:scroll-smooth",
          trackClassName
        )}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            data-slide
            data-active={i === index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className={cn("group/slide shrink-0 snap-start", slideClassName)}
          >
            {slide}
          </div>
        ))}
      </div>
    </>
  )
}

export default SnapCarousel
