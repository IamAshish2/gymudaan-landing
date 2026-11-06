"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react"
import type { StaticImageData } from "next/image"

import {
  claimPlayback,
  getActivated,
  getSound,
  markActivated,
  releasePlayback,
  setSound,
  subscribeSound,
  VIDEO_CONTROL_ATTR,
} from "@/components/landing/primitives/video-sound"
import { IPause, IPlay, IVolume2, IVolumeX } from "@/lib/icons"
import { cn } from "@/lib/utils"

const VIDEO_EVENTS = ["play", "pause", "volumechange"] as const

/** One encoding of the clip; list the most efficient first (e.g. AV1). */
export type VideoSource = { src: string; type: string }

type NetworkInformation = { saveData?: boolean }

const subscribeVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange)
  return () => document.removeEventListener("visibilitychange", onChange)
}

const subscribeLoad = (onChange: () => void) => {
  window.addEventListener("load", onChange)
  return () => window.removeEventListener("load", onChange)
}

type AutoplayVideoProps = {
  /** A single file, or encodings in order of preference. */
  src: string | readonly VideoSource[]
  poster: StaticImageData
  /** Accessible name for the video. */
  label: string
  /** Show a sound toggle; the video still starts muted (autoplay rules). */
  sound?: boolean
  /** Classes for the <video> element, e.g. aspect and object-fit. */
  className?: string
  style?: CSSProperties
  /**
   * For videos below the fold: download and start only near the viewport,
   * after the page has loaded. Leave off above the fold (the hero): there the
   * native autoplay start is measurably cheaper (docs/seo/05).
   */
  deferred?: boolean
  /**
   * Play only while the video is on screen (at least half of it) and the
   * tab is visible; pause once it is mostly scrolled away, carrying on from
   * the same point on return. Sound is on by default and follows the
   * page-wide choice (video-sound.ts): muted only until the visitor's first
   * click, tap or key press (browser autoplay rules), or after they mute.
   * Only one such video plays at a time. Pressing pause keeps it paused
   * until pressed again.
   */
  playInView?: boolean
}

const controlClass =
  "flex size-10 items-center justify-center rounded-full border border-line-glass bg-surface-glass text-white backdrop-blur-md transition-colors duration-300 ease-standard outline-none hover:bg-black/80 focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:transition-none [&_svg]:size-4"

// Muted, looping, inline video for the landing page, and always a pause/play
// button (anything moving for over five seconds must be pausable, WCAG 2.2.2).
// With `sound`, a second button unmutes it.
//
// By default it autoplays natively and pauses on its poster for visitors who
// ask for reduced motion. With `deferred` (below-the-fold videos) it starts
// only once the page has loaded and the video is near the viewport; visitors
// who ask for reduced motion or less data (Save-Data) then get the poster and
// the play button, and nothing is downloaded until they press it.
// With `playInView`, it also plays only while on screen and pauses when
// scrolled away (see the prop).
const AutoplayVideo = ({
  src,
  poster,
  label,
  sound = false,
  className,
  style,
  deferred = false,
  playInView = false,
}: AutoplayVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null)
  // playInView: null until the first intersection report.
  const [inView, setInView] = useState<boolean | null>(null)
  // The visitor's own play/pause press, which wins over everything else.
  const [choice, setChoice] = useState<"play" | "pause" | null>(null)
  // Set when the browser refused sound, so it isn't retried (each retry
  // would stall the video) until the visitor interacts with the page.
  const soundBlocked = useRef(false)
  const soundOn = useSyncExternalStore(subscribeSound, getSound, () => false)
  const activated = useSyncExternalStore(
    subscribeSound,
    getActivated,
    () => false
  )
  const tabVisible = useSyncExternalStore(
    subscribeVisibility,
    () => !document.hidden,
    () => true
  )
  const pageLoaded = useSyncExternalStore(
    subscribeLoad,
    () => document.readyState === "complete",
    () => false
  )

  useEffect(() => {
    const video = ref.current
    if (!video || playInView) return undefined

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (!deferred) {
      if (reducedMotion) video.pause()
      return undefined
    }

    const saveData = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection?.saveData
    if (reducedMotion || saveData) return undefined

    let cancelled = false
    let observer: IntersectionObserver | undefined
    const start = () => {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          observer?.disconnect()
          if (cancelled) return
          video.muted = true
          // Autoplay can still be refused (e.g. iOS Low Power Mode); the play
          // button then reflects that and stays usable.
          video.play().catch(() => {})
        },
        { rootMargin: "200px 0px" }
      )
      observer.observe(video)
    }

    if (document.readyState === "complete") start()
    else window.addEventListener("load", start, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener("load", start)
      observer?.disconnect()
    }
  }, [deferred, playInView])

  // playInView: on screen = at least half visible; off = under a quarter.
  // In between it keeps its last state, so it doesn't flicker at the edge.
  useEffect(() => {
    const video = ref.current
    if (!video || !playInView) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.isIntersecting ? entry.intersectionRatio : 0
        // The first reading has no previous state: a quarter visible
        // counts (e.g. a hero partly below the fold on load).
        setInView((prev) =>
          ratio >= 0.5 || (prev === null && ratio >= 0.25)
            ? true
            : ratio < 0.25
              ? false
              : prev
        )
      },
      { threshold: [0, 0.25, 0.5] }
    )
    observer.observe(video)
    return () => {
      observer.disconnect()
      releasePlayback(video)
    }
  }, [playInView])

  useEffect(() => {
    const video = ref.current
    if (!video || !playInView || inView === null) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const saveData = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection?.saveData
    // Reduced motion / Save-Data: the poster until the visitor presses play.
    const still = reducedMotion || (deferred && Boolean(saveData))
    const shouldPlay =
      inView &&
      tabVisible &&
      choice !== "pause" &&
      (choice === "play" || (!still && (!deferred || pageLoaded)))

    if (!shouldPlay) {
      if (!video.paused) video.pause()
      return
    }
    claimPlayback(video)
    // Never muted by choice: it always tries to play with sound. Browsers
    // refuse that until the visitor has clicked, tapped or pressed a key
    // (unless they allow sound for this site); then it carries on muted,
    // the sound button shows that truthfully, and the first interaction
    // anywhere turns the sound on (video-sound.ts).
    if (activated) soundBlocked.current = false
    video.muted = !soundOn || soundBlocked.current
    video.play().catch(() => {
      if (video.muted) return
      soundBlocked.current = true
      video.muted = true
      video.play().catch(() => {})
    })
  }, [
    playInView,
    inView,
    tabVisible,
    choice,
    soundOn,
    activated,
    deferred,
    pageLoaded,
  ])

  // Read straight from the element: autoplay can start before React hydrates
  // (so onPlay props would miss it) or be blocked (iOS Low Power Mode).
  const subscribe = useCallback((onChange: () => void) => {
    const video = ref.current
    if (!video) return () => {}

    VIDEO_EVENTS.forEach((name) => video.addEventListener(name, onChange))
    return () =>
      VIDEO_EVENTS.forEach((name) => video.removeEventListener(name, onChange))
  }, [])
  const playing = useSyncExternalStore(
    subscribe,
    () => !(ref.current?.paused ?? true),
    () => false
  )
  const muted = useSyncExternalStore(
    subscribe,
    () => ref.current?.muted ?? true,
    () => true
  )

  const togglePlay = () => {
    const video = ref.current
    if (!video) return
    if (playInView) {
      markActivated()
      setChoice(video.paused ? "play" : "pause")
    }
    if (video.paused) {
      if (playInView) claimPlayback(video)
      void video.play()
    } else video.pause()
  }

  const toggleSound = () => {
    const video = ref.current
    if (!video) return
    if (playInView) {
      markActivated()
      setSound(video.muted)
    }
    if (!video.muted) {
      video.muted = true
      return
    }
    if (playInView) claimPlayback(video)

    // Unmuting is a request to hear it, so keep it playing. Some browsers
    // pause a muted autoplay video once it gains sound; play() resumes it
    // within this click. If sound is still refused, fall back to muted so the
    // video keeps going and the button stays truthful.
    video.muted = false
    video.play().catch(() => {
      video.muted = true
      void video.play()
    })
  }

  return (
    <>
      {/* Deferred videos have no autoPlay attribute (it would download the
          whole clip at once, ignoring preload); the effect above starts them. */}
      <video
        ref={ref}
        src={typeof src === "string" ? src : undefined}
        poster={poster.src}
        width={poster.width}
        height={poster.height}
        autoPlay={!deferred}
        // playInView videos start with sound where the browser allows it.
        muted={!playInView}
        loop
        playsInline
        preload={deferred ? "none" : "metadata"}
        aria-label={label}
        className={cn("block bg-surface-card", className)}
        style={style}
      >
        {typeof src === "string"
          ? null
          : src.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
      </video>
      <div className="absolute right-3 bottom-3 flex gap-2 lg:right-5 lg:bottom-5">
        {sound ? (
          <button
            type="button"
            {...{ [VIDEO_CONTROL_ATTR]: "" }}
            onClick={toggleSound}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className={controlClass}
          >
            {muted ? <IVolumeX aria-hidden /> : <IVolume2 aria-hidden />}
          </button>
        ) : null}
        <button
          type="button"
          {...{ [VIDEO_CONTROL_ATTR]: "" }}
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className={controlClass}
        >
          {playing ? (
            <IPause aria-hidden className="fill-current" />
          ) : (
            <IPlay aria-hidden className="translate-x-px fill-current" />
          )}
        </button>
      </div>
    </>
  )
}

export default AutoplayVideo
