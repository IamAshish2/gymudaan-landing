"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import type { StaticImageData } from "next/image"

import type { VideoSource } from "@/components/landing/primitives/AutoplayVideo"
import { CAROUSEL_ADVANCE_EVENT } from "@/hooks/use-snap-carousel"
import { IPause, IPlay } from "@/lib/icons"

type NetworkInformation = { saveData?: boolean }

type ServiceVideoProps = {
  sources: readonly VideoSource[]
  poster: StaticImageData
  /** Accessible name for the video. */
  label: string
}

const VIDEO_EVENTS = ["play", "pause"] as const

const noop = () => {}

const subscribeVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange)
  return () => document.removeEventListener("visibilitychange", onChange)
}

const subscribeLoad = (onChange: () => void) => {
  window.addEventListener("load", onChange)
  return () => window.removeEventListener("load", onChange)
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

// Visitors who asked for less motion or less data get the poster until they
// press play.
const prefersStill = () =>
  window.matchMedia(REDUCED_MOTION).matches ||
  Boolean(
    (navigator as Navigator & { connection?: NetworkInformation }).connection
      ?.saveData
  )

// Feature demo inside a Services carousel card. It plays only while its card
// is the active slide, the section is on screen and the tab is visible; it
// pauses otherwise and restarts from the top each time its card comes back.
// Nothing downloads until the card first plays (the poster shows until then).
// When the clip ends the carousel moves to the next card; the pause button
// stops both the clip and that auto-advance (WCAG 2.2.2).
const ServiceVideo = ({ sources, poster, label }: ServiceVideoProps) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const loadedRef = useRef(false)
  const wasActiveRef = useRef(false)

  const [inView, setInView] = useState(false)
  // null until the visitor presses the button; then their choice wins.
  const [userPaused, setUserPaused] = useState<boolean | null>(null)
  const [armed, setArmed] = useState(false)

  // The slide wrapper's data-active, set by SnapCarousel.
  const subscribeActive = useCallback((onChange: () => void) => {
    const slide = wrapRef.current?.closest("[data-slide]")
    if (!slide) return noop
    const observer = new MutationObserver(onChange)
    observer.observe(slide, {
      attributes: true,
      attributeFilter: ["data-active"],
    })
    return () => observer.disconnect()
  }, [])
  const active = useSyncExternalStore(
    subscribeActive,
    () =>
      wrapRef.current?.closest<HTMLElement>("[data-slide]")?.dataset.active ===
      "true",
    () => false
  )

  const tabVisible = useSyncExternalStore(
    subscribeVisibility,
    () => !document.hidden,
    () => true
  )
  // Wait for the page's own load so the clip never competes with LCP.
  const pageLoaded = useSyncExternalStore(
    subscribeLoad,
    () => document.readyState === "complete",
    () => false
  )
  const still = useSyncExternalStore(subscribeMotion, prefersStill, () => false)

  const subscribePlayback = useCallback((onChange: () => void) => {
    const video = videoRef.current
    if (!video) return noop
    VIDEO_EVENTS.forEach((name) => video.addEventListener(name, onChange))
    return () =>
      VIDEO_EVENTS.forEach((name) => video.removeEventListener(name, onChange))
  }, [])
  const playing = useSyncExternalStore(
    subscribePlayback,
    () => !(videoRef.current?.paused ?? true),
    () => false
  )

  const paused = userPaused ?? still
  const shouldPlay = pageLoaded && active && inView && tabVisible && !paused

  // Attach the sources the first time the card should play.
  if (shouldPlay && !armed) setArmed(true)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    )
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [])

  // Back to the start whenever this card becomes the active one.
  useEffect(() => {
    const video = videoRef.current
    if (active && !wasActiveRef.current && video && loadedRef.current) {
      video.currentTime = 0
    }
    wasActiveRef.current = active
  }, [active])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !armed) return
    if (!loadedRef.current) {
      loadedRef.current = true
      video.load()
    }
    if (shouldPlay) {
      video.muted = true
      // Autoplay can still be refused (e.g. iOS Low Power Mode); the button
      // then shows Play and stays usable.
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [armed, shouldPlay])

  // At the end of the clip, ask the carousel for the next card. If nothing
  // takes the request (no auto-advancing carousel), replay instead.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const onEnded = () => {
      const handled = !video.dispatchEvent(
        new Event(CAROUSEL_ADVANCE_EVENT, { bubbles: true, cancelable: true })
      )
      if (handled) return
      video.currentTime = 0
      video.play().catch(() => {})
    }
    video.addEventListener("ended", onEnded)
    return () => video.removeEventListener("ended", onEnded)
  }, [])

  // Progress bar: written straight to the DOM each frame while playing.
  useEffect(() => {
    const video = videoRef.current
    const fill = fillRef.current
    if (!video || !fill) return undefined

    const paint = () => {
      const ratio = video.duration ? video.currentTime / video.duration : 0
      fill.style.transform = `scaleX(${ratio})`
    }
    video.addEventListener("seeked", paint)
    paint()

    let frame = 0
    if (playing) {
      const step = () => {
        paint()
        frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(frame)
      video.removeEventListener("seeked", paint)
    }
    // The bar only exists while the card is active.
  }, [playing, active])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {/* No autoPlay: playback is driven by the effects above. */}
      <video
        ref={videoRef}
        poster={poster.src}
        width={poster.width}
        height={poster.height}
        muted
        playsInline
        preload="none"
        aria-label={label}
        className="block size-full object-cover"
      >
        {armed
          ? sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))
          : null}
      </video>

      {active ? (
        <>
          {/* Sits in the clip's black bottom margin, clear of the dashboard. */}
          <span
            aria-hidden
            className="absolute inset-x-3 bottom-1 h-0.5 overflow-hidden rounded-full bg-white/20 sm:inset-x-4 sm:bottom-2.5 sm:h-1"
          >
            <span
              ref={fillRef}
              className="block h-full origin-left rounded-full bg-brand"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
          <button
            type="button"
            onClick={() => setUserPaused(playing)}
            aria-label={playing ? "Pause video" : "Play video"}
            className="absolute right-3 bottom-3.5 flex size-8 items-center justify-center rounded-full border border-line-glass bg-surface-glass text-white backdrop-blur-md transition-colors duration-300 ease-standard outline-none hover:bg-black/80 focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:transition-none sm:right-4 sm:bottom-6 sm:size-9 [&_svg]:size-3.5"
          >
            {playing ? (
              <IPause aria-hidden className="fill-current" />
            ) : (
              <IPlay aria-hidden className="translate-x-px fill-current" />
            )}
          </button>
        </>
      ) : null}
    </div>
  )
}

export default ServiceVideo
