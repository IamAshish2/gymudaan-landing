import type { Metadata } from "next"
import Image from "next/image"

import AboutCapabilities from "@/components/about/AboutCapabilities"
import AboutCompany from "@/components/about/AboutCompany"
import AboutPrinciples from "@/components/about/AboutPrinciples"
import AboutStory from "@/components/about/AboutStory"
import Container from "@/components/landing/primitives/Container"
import PageIntro from "@/components/landing/primitives/PageIntro"
import Reveal from "@/components/landing/primitives/Reveal"
import RichTextLine from "@/components/landing/primitives/RichTextLine"
import ThreadsGreeting from "@/components/landing/primitives/ThreadsGreeting"
import ClientLogoList from "@/components/landing/sections/ClientLogoList"
import FinalCta from "@/components/landing/sections/FinalCta"
import WhoWeServe from "@/components/landing/sections/WhoWeServe"
import JsonLd from "@/components/shared/JsonLd"
import Typography from "@/components/ui/Typography"
import { aboutIntro, aboutTrustedTitle } from "@/lib/about/content"
import { ROUTES } from "@/lib/routes"
import { aboutPageJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld"
import { pageMetadata } from "@/lib/seo/metadata"
import { PAGE_SEO } from "@/lib/seo/pages"
import lightPattern from "@/public/landing/bg/light-pattern.webp"

export const metadata: Metadata = pageMetadata({
  path: ROUTES.about,
  ...PAGE_SEO.about,
})

// In the footer only; not in the nav or sitemap until the copy is signed off
// (lib/about/content.ts). Bands follow the homepage: dark, then the light band
// laid over it with rounded corners, then dark again.
const AboutPage = () => (
  <>
    <JsonLd data={aboutPageJsonLd({ path: ROUTES.about, ...PAGE_SEO.about })} />
    <JsonLd data={breadcrumbJsonLd([{ name: "About", path: ROUTES.about }])} />

    <PageIntro
      backdrop={<ThreadsGreeting />}
      badge={aboutIntro.badge}
      title={aboutIntro.title}
      description={aboutIntro.description}
      titleClassName="max-w-[17em]"
      descriptionClassName="max-w-[36em]"
    />

    <AboutStory />

    <section aria-labelledby="trusted-title" className="pb-section text-white">
      <Container>
        <Reveal>
          <Typography
            variant="bodyLg"
            as="h2"
            id="trusted-title"
            className="text-center font-medium"
          >
            <RichTextLine text={aboutTrustedTitle} />
          </Typography>
          <ClientLogoList className="mt-8 lg:mt-15" />
        </Reveal>
      </Container>
    </section>

    <div className="band-arrive relative -mt-6 rounded-t-tile bg-surface-dark">
      <hr className="border-line-dark" />
      <AboutCapabilities />
    </div>

    <div className="band-arrive relative isolate mt-9 overflow-hidden rounded-t-band bg-surface-light pb-[var(--radius-band)]">
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
      <AboutPrinciples />
    </div>

    <div className="band-arrive relative -mt-[var(--radius-band)] rounded-t-band bg-surface-dark">
      <AboutCompany />
      <FinalCta />
    </div>
  </>
)

export default AboutPage
