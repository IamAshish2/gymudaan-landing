"use client"

import { useEffect, useState } from "react"

import Typography from "@/components/ui/Typography"
import type { Stat } from "@/lib/landing/types"
import { cn } from "@/lib/utils"

type StatsRowProps = {
  stats: Stat[]
}

const CYCLE_MS = 3500

// One stat is "lit" at a time (dark ink + orange rules above and below it),
// as in Figma. The highlight advances every few seconds and follows hover;
// with reduced motion it stays on the first stat unless hovered.
const StatsRow = ({ stats }: StatsRowProps) => {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % stats.length),
      CYCLE_MS
    )
    return () => window.clearInterval(timer)
  }, [paused, stats.length])

  return (
    <dl
      className="mt-8 grid grid-cols-2 border-y border-ink-muted/20 lg:mt-10 lg:flex lg:justify-between lg:px-2"
      onMouseLeave={() => setPaused(false)}
    >
      {stats.map((stat, index) => {
        const isActive = index === active

        return (
          <div
            key={stat.value}
            onMouseEnter={() => {
              setPaused(true)
              setActive(index)
            }}
            className="relative flex flex-col-reverse items-center gap-2 px-2 py-6 text-center lg:min-w-[11em] lg:px-0 lg:py-7.5"
          >
            {(
              ["top-0 -translate-y-px", "bottom-0 translate-y-px"] as const
            ).map((edge) => (
              <span
                key={edge}
                aria-hidden
                className={cn(
                  "absolute -inset-x-1.5 h-0.5 rounded-full bg-[linear-gradient(90deg,transparent,var(--color-brand)_25%,var(--color-brand)_75%,transparent)] transition-opacity duration-500 ease-standard motion-reduce:transition-none",
                  edge,
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
            <dt
              className={cn(
                "max-w-[14em] text-body-lg transition-colors duration-500 motion-reduce:transition-none",
                isActive ? "text-ink" : "text-ink-subtle"
              )}
            >
              {stat.label}
            </dt>
            <dd>
              <Typography
                as="span"
                variant="stat"
                className={cn(
                  "transition-colors duration-500 motion-reduce:transition-none",
                  isActive ? "text-ink" : "text-ink-muted"
                )}
              >
                {stat.value}
              </Typography>
            </dd>
          </div>
        )
      })}
    </dl>
  )
}

export default StatsRow
