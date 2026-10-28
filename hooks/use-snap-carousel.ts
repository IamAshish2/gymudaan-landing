"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * State for a native CSS scroll-snap carousel: swipe, trackpad and keyboard
 * scrolling come from the browser, this adds prev/next and the active index.
 * Slides are the scroller's direct children marked `data-slide`; the scroller
 * must be `position: relative` so their offsetLeft is measured against it.
 */
export const useSnapCarousel = <T extends HTMLElement = HTMLDivElement>() => {
  const scrollerRef = useRef<T>(null)
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const getSlides = useCallback(
    () =>
      Array.from(
        scrollerRef.current?.querySelectorAll<HTMLElement>(
          ":scope > [data-slide]"
        ) ?? []
      ),
    []
  )

  const measure = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const slides = getSlides()
    const maxScroll = scroller.scrollWidth - scroller.clientWidth
    const left = scroller.scrollLeft
    const start = slides[0]?.offsetLeft ?? 0

    // Closest slide to the snap edge; at the far end the last slide counts as
    // active even if it can't reach the start edge.
    let active = 0
    let best = Number.POSITIVE_INFINITY
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - start - left)
      if (distance < best) {
        best = distance
        active = i
      }
    })
    if (maxScroll > 0 && left >= maxScroll - 2) active = slides.length - 1

    setCount(slides.length)
    setIndex(active)
    setCanPrev(left > 2)
    setCanNext(left < maxScroll - 2)
  }, [getSlides])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    frame = requestAnimationFrame(measure)
    scroller.addEventListener("scroll", onScroll, { passive: true })
    const observer = new ResizeObserver(onScroll)
    observer.observe(scroller)

    return () => {
      cancelAnimationFrame(frame)
      scroller.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [measure])

  const scrollToIndex = useCallback(
    (target: number) => {
      const scroller = scrollerRef.current
      const slides = getSlides()
      if (!scroller || slides.length === 0) return

      const clamped = Math.max(0, Math.min(target, slides.length - 1))
      const start = slides[0].offsetLeft
      scroller.scrollTo({
        left: slides[clamped].offsetLeft - start,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      })
    },
    [getSlides]
  )

  const prev = useCallback(
    () => scrollToIndex(index - 1),
    [index, scrollToIndex]
  )
  const next = useCallback(
    () => scrollToIndex(index + 1),
    [index, scrollToIndex]
  )

  return {
    scrollerRef,
    index,
    count,
    canPrev,
    canNext,
    prev,
    next,
    scrollToIndex,
  }
}
