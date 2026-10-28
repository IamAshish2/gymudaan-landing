import Image from "next/image"

import Section from "@/components/landing/primitives/Section"
import SnapCarousel from "@/components/landing/primitives/SnapCarousel"
import Typography from "@/components/ui/Typography"
import { audiences } from "@/lib/landing/content"

const WhoWeServe = () => (
  <Section
    id="who-we-serve"
    labelledBy="audiences-title"
    tone="light"
    className="pb-[calc(var(--spacing-section)*0.7)]"
  >
    <SnapCarousel
      intro={audiences}
      titleId="audiences-title"
      id="audiences-track"
      label="audiences"
      tone="light"
      arrows="light"
      trackClassName="scroll-px-4 gap-5 rounded-card border border-line-light p-4 sm:scroll-px-6 sm:p-6 lg:scroll-px-7.5 lg:gap-9 lg:px-7.5 lg:pt-6.5 lg:pb-9"
      slideClassName="basis-[82%] sm:basis-[46%] lg:basis-[27.6%]"
    >
      {audiences.items.map((audience) => (
        <article key={audience.title} className="flex flex-col">
          <div className="relative aspect-[394/494] overflow-hidden rounded-photo">
            <Image
              src={audience.image}
              alt=""
              fill
              sizes="(min-width: 1728px) 394px, (min-width: 1024px) 26vw, (min-width: 640px) 45vw, 80vw"
              className="object-cover"
            />
          </div>
          <Typography variant="cardTitle" className="mt-6 px-1">
            {audience.title}
          </Typography>
          <Typography variant="body" className="mt-2 px-1 opacity-80">
            {audience.description}
          </Typography>
        </article>
      ))}
    </SnapCarousel>
  </Section>
)

export default WhoWeServe
