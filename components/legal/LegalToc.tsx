"use client"

import { useEffect, useState } from "react"

import Typography from "@/components/ui/Typography"
import type { LegalTocEntry } from "@/lib/legal/types"
import { cn } from "@/lib/utils"

type LegalTocProps = {
  entries: LegalTocEntry[]
}

// A section counts as current once its top passes this fraction of the
// viewport, which clears the fixed header.
const READING_LINE = 0.25

// Sticky contents list. The orange pill follows the section being read,
// falling back to the first entry above it. On phones the list becomes a
// sideways-scrolling strip above the text.
const LegalToc = ({ entries }: LegalTocProps) => {
  const [activeId, setActiveId] = useState(entries[0]?.sectionId)

  useEffect(() => {
    const sections = entries.flatMap(({ sectionId }) => {
      const section = document.getElementById(sectionId)
      return section ? [section] : []
    })

    const update = () => {
      const line = window.innerHeight * READING_LINE
      let current = entries[0]?.sectionId
      let closest = -Infinity

      // Entries are not always in page order, so compare positions instead
      // of taking the last match.
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top
        if (top <= line && top > closest) {
          closest = top
          current = section.id
        }
      })

      setActiveId(current)
    }

    const frame = requestAnimationFrame(update)
    window.addEventListener("scroll", update, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
    }
  }, [entries])

  return (
    <nav
      aria-labelledby="legal-toc-title"
      className="min-w-0 lg:sticky lg:top-28 lg:self-start"
    >
      <Typography as="h2" variant="titleSm" id="legal-toc-title">
        Table of Contents
      </Typography>
      <ul className="mt-4 -mr-gutter flex gap-1 overflow-x-auto pr-gutter lg:mt-6 lg:mr-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:pr-0">
        {entries.map((entry) => {
          const active = entry.sectionId === activeId

          return (
            <li key={entry.sectionId} className="shrink-0">
              <a
                href={`#${entry.sectionId}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "inline-block rounded-photo px-3.25 py-2.5 text-body-lg font-medium whitespace-nowrap transition-colors duration-300 ease-standard outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:transition-none",
                  active ? "bg-brand" : "hover:text-brand"
                )}
              >
                {entry.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default LegalToc
