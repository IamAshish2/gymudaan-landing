"use client"

import { useEffect, useRef, useState } from "react"

const COUNT_MS = 1600

// Splits "10K+" into 10 with its surroundings. Values like "24/7" don't count.
const parse = (value: string) => {
  const match = /^([^\d]*)(\d+)([^\d/]*)$/.exec(value)

  return match
    ? { prefix: match[1], target: Number(match[2]), suffix: match[3] }
    : null
}

// Counts up once on first view, slowing into the final number. The real value
// renders first, so it's correct without JS and with reduced motion.
const StatValue = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState<number | null>(null)
  const parts = parse(value)

  useEffect(() => {
    const element = ref.current
    if (!element || !parts) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        observer.disconnect()
        const start = performance.now()

        const tick = (now: number) => {
          const progress = Math.min((now - start) / COUNT_MS, 1)
          const eased = 1 - (1 - progress) ** 4

          setCount(Math.round(parts.target * eased))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
    // `parts` is rebuilt from `value` on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden className="tabular-nums">
        {parts && count !== null
          ? `${parts.prefix}${count}${parts.suffix}`
          : value}
      </span>
    </>
  )
}

export default StatValue
