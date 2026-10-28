"use client"

import { useEffect, useState, type ReactNode } from "react"

type ScrollAwareHeaderProps = {
  children: ReactNode
}

// Fixed header that is transparent over the hero and picks up a blurred
// backdrop once the page scrolls. Only the scroll flag is client-side.
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
      className="group/header fixed inset-x-0 top-0 z-50 border-b border-transparent py-4 transition-[padding,background-color,border-color] duration-300 ease-standard data-[scrolled=true]:border-line-dark data-[scrolled=true]:bg-surface-dark/75 data-[scrolled=true]:backdrop-blur-md motion-reduce:transition-none lg:py-12 lg:data-[scrolled=true]:py-4"
    >
      {children}
    </header>
  )
}

export default ScrollAwareHeader
