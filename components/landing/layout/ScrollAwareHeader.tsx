"use client"

import { useEffect, useState, type ReactNode } from "react"

type ScrollAwareHeaderProps = {
  children: ReactNode
}

// Fixed header that is transparent over the hero and floats as a glass bar once
// the page scrolls. Dark glass keeps the white logo and links readable over both
// the dark and light bands. Only the scroll flag is client-side.
const ScrollAwareHeader = ({ children }: ScrollAwareHeaderProps) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    const frame = requestAnimationFrame(onScroll)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <header
      data-scrolled={scrolled}
      className="group/header fixed inset-x-0 top-0 z-50 py-4 transition-[padding] duration-300 ease-standard data-[scrolled=true]:py-2 motion-reduce:transition-none lg:py-12 lg:data-[scrolled=true]:py-3"
    >
      {/* Same width and gutters as Container, so the bar lines up with sections. */}
      <div className="mx-auto w-full max-w-page transition-[padding] duration-300 ease-standard group-data-[scrolled=true]/header:px-gutter motion-reduce:transition-none">
        <div className="rounded-panel border border-transparent transition-[padding,background-color,border-color,box-shadow] duration-300 ease-standard group-data-[scrolled=true]/header:border-line-glass group-data-[scrolled=true]/header:bg-surface-glass group-data-[scrolled=true]/header:py-1.5 group-data-[scrolled=true]/header:shadow-glass group-data-[scrolled=true]/header:backdrop-blur-xl group-data-[scrolled=true]/header:backdrop-saturate-150 motion-reduce:transition-none lg:group-data-[scrolled=true]/header:py-2.5">
          {children}
        </div>
      </div>
    </header>
  )
}

export default ScrollAwareHeader
