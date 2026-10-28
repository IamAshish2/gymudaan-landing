import Image from "next/image"

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
import { SITE } from "@/lib/site"
import lightPattern from "@/public/landing/bg/light-pattern.webp"

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  description: SITE.description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
}

// Section order and band layering follow Figma frame 1:6. Each band after
// the hero starts with rounded top corners laid over the band before it.
const HomePage = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(softwareJsonLd).replace(/</g, "\\u003c"),
      }}
    />

    <Hero />

    <div className="relative -mt-6 rounded-t-tile bg-surface-dark">
      <Services />
      <hr className="border-line-dark" />
      <MainFeatures />
      <hr className="border-line-dark" />
    </div>

    <div className="relative isolate mt-9 overflow-hidden rounded-t-band bg-surface-light pb-[var(--radius-band)]">
      {/* Faint orange line art at 14% (node 1:44), offset exactly as in Figma. */}
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

    <div className="relative -mt-[var(--radius-band)] rounded-t-band bg-surface-dark">
      <HowItWorks />
      <Testimonials />
      <hr className="border-line-dark" />
      <Insights />
      <FinalCta />
      <FaqSection />
    </div>
  </>
)

export default HomePage
