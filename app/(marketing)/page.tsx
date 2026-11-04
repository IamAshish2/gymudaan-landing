import type { Metadata } from "next"
import Image from "next/image"

import AvailableEverywhere from "@/components/landing/sections/AvailableEverywhere"
import BuiltForNepal from "@/components/landing/sections/BuiltForNepal"
import Comparison from "@/components/landing/sections/Comparison"
import Control from "@/components/landing/sections/Control"
import FaqSection from "@/components/landing/sections/FaqSection"
import FinalCta from "@/components/landing/sections/FinalCta"
import Hero from "@/components/landing/sections/Hero"
import HowItWorks from "@/components/landing/sections/HowItWorks"
import Insights from "@/components/landing/sections/Insights"
import MainFeatures from "@/components/landing/sections/MainFeatures"
import Services from "@/components/landing/sections/Services"
import Stats from "@/components/landing/sections/Stats"
import Testimonials from "@/components/landing/sections/Testimonials"
import WhoWeServe from "@/components/landing/sections/WhoWeServe"
import JsonLd from "@/components/shared/JsonLd"
import { ROUTES } from "@/lib/routes"
import { homeJsonLd } from "@/lib/seo/json-ld"
import { pageMetadata } from "@/lib/seo/metadata"
import { PAGE_SEO } from "@/lib/seo/pages"
import lightPattern from "@/public/landing/bg/light-pattern.webp"

export const metadata: Metadata = pageMetadata({
  path: ROUTES.home,
  ...PAGE_SEO.home,
})

// Section order and band layering follow Figma frame 1:11. Each band after
// the hero starts with rounded top corners laid over the band before it.
const HomePage = () => (
  <>
    {/* Organization, WebSite and SoftwareApplication, linked by @id. */}
    <JsonLd data={homeJsonLd()} />

    <Hero>
      <Testimonials />
    </Hero>

    <div className="band-arrive relative -mt-6 rounded-t-tile bg-surface-dark">
      <Services />
      <hr className="border-line-dark" />
      <MainFeatures />
      <hr className="border-line-dark" />
      <Comparison />
      <hr className="border-line-dark" />
      <BuiltForNepal />
    </div>

    <div className="band-arrive relative isolate mt-9 overflow-hidden rounded-t-band bg-surface-light pb-[var(--radius-band)]">
      {/* Faint orange line art at 14%, offset exactly as in Figma. */}
      <div
        aria-hidden
        className="absolute -top-[33.33%] -left-[19.44%] -z-10 size-[138.89%] opacity-14"
      >
        <Image
          src={lightPattern}
          alt=""
          fill
          sizes="140vw"
          className="object-cover"
        />
      </div>
      <WhoWeServe />
      <Control />
      <Stats />
    </div>

    <div className="band-arrive relative -mt-[var(--radius-band)] rounded-t-band bg-surface-dark">
      <HowItWorks />
      <hr className="border-line-dark" />
      <AvailableEverywhere />
      <Insights />
      <FinalCta />
      <FaqSection />
    </div>
  </>
)

export default HomePage
