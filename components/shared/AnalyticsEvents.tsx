"use client"

import { useEffect } from "react"

import { ROUTES } from "@/lib/routes"

type Gtag = (command: "event", name: string, params: object) => void

// Lead/conversion clicks, from one delegated listener so no link markup has
// to change. Mounted only when GA4 is loaded (components/shared/Analytics.tsx).
const eventFor = (href: string): string | null => {
  if (href.startsWith("https://wa.me/")) return "whatsapp_click"
  if (href.startsWith("mailto:")) return "email_click"
  if (href.startsWith("tel:")) return "phone_click"
  try {
    const url = new URL(href, window.location.href)
    if (url.origin === window.location.origin) {
      if (url.pathname === ROUTES.onboarding) return "get_started_click"
      if (url.pathname === ROUTES.pricing) return "pricing_click"
    }
  } catch {
    // Not a URL we track.
  }
  return null
}

const AnalyticsEvents = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]")
      if (!(link instanceof HTMLAnchorElement)) return
      const name = eventFor(link.getAttribute("href") ?? "")
      const gtag = (window as Window & { gtag?: Gtag }).gtag
      if (!name || !gtag) return
      gtag("event", name, {
        link_url: link.href,
        link_text: link.textContent?.trim().slice(0, 100) ?? "",
        page_path: window.location.pathname,
      })
    }

    document.addEventListener("click", onClick, { capture: true })
    return () =>
      document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}

export default AnalyticsEvents
