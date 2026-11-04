"use client"

import { useEffect, useState } from "react"

import WebThreads from "@/components/shared/effects/WebThreads"
import { cn } from "@/lib/utils"

const VISIBLE_MS = 3000
const FADE_MS = 1000

type Phase = "waiting" | "on" | "fading" | "gone"

// The WebGL setup is a long main-thread task, so the weave only starts once
// the page has loaded and the browser is idle: the page's own content (its
// LCP heading) paints first.
const IDLE_TIMEOUT_MS = 1500

// TRIAL: the React Bits WebThreads weave greets each visit to an inner page
// (pricing, blogs, articles, legal) for three seconds, fades out, then
// unmounts so the WebGL loop stops. Pass it to PageIntro's `backdrop`. It is
// one screen tall and tilted, so the weave crosses the middle of the
// viewport; content after the intro must be positioned to paint above it.
const ThreadsGreeting = () => {
  const [phase, setPhase] = useState<Phase>("waiting")

  useEffect(() => {
    // Safari has no requestIdleCallback; a short timeout stands in for it.
    const hasIdle = typeof window.requestIdleCallback === "function"
    let handle: number | undefined
    const begin = () => {
      handle = hasIdle
        ? window.requestIdleCallback(() => setPhase("on"), {
            timeout: IDLE_TIMEOUT_MS,
          })
        : window.setTimeout(() => setPhase("on"), 200)
    }

    if (document.readyState === "complete") begin()
    else window.addEventListener("load", begin, { once: true })

    return () => {
      window.removeEventListener("load", begin)
      if (handle === undefined) return
      if (hasIdle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
    }
  }, [])

  // One-way flag, so moving on to "fading" doesn't cancel the "gone" timer.
  const started = phase !== "waiting"
  useEffect(() => {
    if (!started) return undefined
    const fade = window.setTimeout(() => setPhase("fading"), VISIBLE_MS)
    const gone = window.setTimeout(() => setPhase("gone"), VISIBLE_MS + FADE_MS)

    return () => {
      window.clearTimeout(fade)
      window.clearTimeout(gone)
    }
  }, [started])

  if (phase === "waiting" || phase === "gone") return null

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-10 h-svh mask-t-from-80% mask-b-from-60% transition-opacity ease-standard motion-reduce:transition-none",
        phase === "fading" && "opacity-0"
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <WebThreads
        colors={["#ff6a00", "#ff9a3d", "#ffd2a8"]}
        coreColor="#ffffff"
        threadCount={7}
        spread={0.2}
        position={0.5}
        angle={-12}
        fade={0.55}
        opacity={0.2}
        brightness={0.5}
        pulseOnClick={false}
      />
    </div>
  )
}

export default ThreadsGreeting
