"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
} from "react"
import type { StaticImageData } from "next/image"

import { IPause, IPlay, IVolume2, IVolumeX } from "@/lib/icons"
import { cn } from "@/lib/utils"

const VIDEO_EVENTS = ["play", "pause", "volumechange"] as const

type AutoplayVideoProps = {
  src: string
  poster: StaticImageData
  /** Accessible name for the video. */
  label: string
  /** Show a sound toggle; the video still starts muted (autoplay rules). */
  sound?: boolean
  /** Classes for the <video> element, e.g. aspect and object-fit. */
  className?: string
  style?: CSSProperties
}

const controlClass =
  "flex size-10 items-center justify-center rounded-full border border-line-glass bg-surface-glass text-white backdrop-blur-md transition-colors duration-300 ease-standard outline-none hover:bg-black/80 focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:transition-none [&_svg]:size-4"

// Muted, looping, inline video for the landing page. It autoplays, stays on
// its poster for visitors who ask for reduced motion, and always has a
// pause/play button (anything moving for over five seconds must be pausable,
// WCAG 2.2.2). With `sound`, a second button unmutes it.
const AutoplayVideo = ({
  src,
  poster,
  label,
  sound = false,
  className,
  style,
}: AutoplayVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause()
    }
  }, [])

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
    if (video.paused) void video.play()
    else video.pause()
  }

  const toggleSound = () => {
    const video = ref.current
    if (!video) return
    if (!video.muted) {
      video.muted = true
      return
    }

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
      <video
        ref={ref}
        src={src}
        poster={poster.src}
        width={poster.width}
        height={poster.height}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className={cn("block bg-surface-card", className)}
        style={style}
      />
      <div className="absolute right-3 bottom-3 flex gap-2 lg:right-5 lg:bottom-5">
        {sound ? (
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className={controlClass}
          >
            {muted ? <IVolumeX aria-hidden /> : <IVolume2 aria-hidden />}
          </button>
        ) : null}
        <button
          type="button"
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
