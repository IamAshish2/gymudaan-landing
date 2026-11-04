"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

const STAGGER_MS = 90

type RevealProps = {
  children: ReactNode
  /** Layout for the wrapper, e.g. to keep a parent's flex column. */
  className?: string
}

// Fades each direct child up the first time it scrolls into view, plus the
// items of any `.reveal-stagger` list inside, one after another. The hidden
// state and the motion live in globals.css, behind prefers-reduced-motion.
const Reveal = ({ children, className }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue

          entry.target.setAttribute("data-revealed", "")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    )

    for (const child of root.children) observer.observe(child)

    for (const list of root.querySelectorAll(".reveal-stagger")) {
      Array.from(list.children).forEach((item, index) => {
        if (!(item instanceof HTMLElement)) return

        item.style.setProperty("--reveal-delay", `${index * STAGGER_MS}ms`)
        observer.observe(item)
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn("reveal-group", className)}>
      {children}
    </div>
  )
}

export default Reveal
