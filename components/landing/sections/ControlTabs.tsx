"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Tabs as TabsPrimitive } from "radix-ui"

import type { ControlTab } from "@/lib/landing/types"
import { cn } from "@/lib/utils"

type ControlTabsProps = {
  tabs: ControlTab[]
}

// Four tab cards over one large screenshot. The active card carries the
// orange top rule from Figma (node 1:311). Radix handles roving focus and
// arrow-key navigation between the cards.
//
// The rule doubles as a timer: it fills and moves on to the next tab while the
// section is on screen. Hovering or focusing pauses it, and choosing a tab
// stops it for good. It's driven by the CSS animation ending, so with reduced
// motion there's no animation and the tabs never move on their own.
const ControlTabs = ({ tabs }: ControlTabsProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(tabs[0]?.id ?? "")
  const [isAuto, setIsAuto] = useState(true)
  const [isOnScreen, setIsOnScreen] = useState(false)
  const [hasBeenSeen, setHasBeenSeen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry?.isIntersecting ?? false

        setIsOnScreen(isVisible)
        if (isVisible) setHasBeenSeen(true)
      },
      { threshold: 0.35 }
    )

    observer.observe(root)

    return () => observer.disconnect()
  }, [])

  const goToNext = () => {
    const index = tabs.findIndex((tab) => tab.id === active)
    const next = tabs[(index + 1) % tabs.length]

    if (next) setActive(next.id)
  }

  const isRunning = isAuto && isOnScreen && !isPaused

  return (
    <TabsPrimitive.Root
      ref={rootRef}
      value={active}
      onValueChange={(value) => {
        setActive(value)
        setIsAuto(false)
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="mt-6 flex flex-col gap-8 lg:mt-8 lg:gap-14"
    >
      <TabsPrimitive.List
        aria-label="Product areas"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5"
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.id}
            value={tab.id}
            className="group/tab relative flex items-center gap-2.5 rounded-card border border-line-light bg-surface-light px-3 py-3 text-left text-title-sm font-normal text-ink transition-colors duration-300 ease-standard outline-none hover:border-ink/15 focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:transition-none sm:px-5 sm:py-5 lg:gap-2.5 lg:py-6.5 lg:pr-5 lg:pl-8"
          >
            <span
              aria-hidden
              onAnimationEnd={goToNext}
              style={{ animationPlayState: isRunning ? "running" : "paused" }}
              className={cn(
                "absolute top-0 left-6 h-0.5 w-[41%] origin-left -translate-y-px rounded-full bg-[linear-gradient(90deg,transparent,var(--color-brand)_20%,var(--color-brand)_80%,transparent)] opacity-0 transition-opacity duration-300 group-data-[state=active]/tab:opacity-100 motion-reduce:transition-none",
                isAuto && tab.id === active && "motion-safe:animate-tab-timer"
              )}
            />
            <span className="flex size-10 shrink-0 items-center justify-center rounded-badge bg-surface-tile lg:h-11.25 lg:w-12">
              {/* The icons are not square: contain them in a square box so
                  they keep their shape and both dimensions scale together. */}
              <Image
                src={tab.icon}
                alt=""
                width={24}
                height={24}
                className="size-5 object-contain lg:size-6"
              />
            </span>
            <span className="min-w-0">{tab.label}</span>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {tabs.map((tab, index) => (
        // Stays mounted so its image is ready before the tab changes to it.
        <TabsPrimitive.Content
          key={tab.id}
          value={tab.id}
          forceMount
          className="overflow-hidden rounded-card border border-line-frame outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=inactive]:hidden motion-reduce:data-[state=active]:animate-none"
        >
          <Image
            src={tab.image.src}
            alt={tab.image.alt}
            sizes="(min-width: 1728px) 1528px, 92vw"
            className="h-auto w-full"
            loading={index === 0 || hasBeenSeen ? "eager" : "lazy"}
          />
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}

export default ControlTabs
