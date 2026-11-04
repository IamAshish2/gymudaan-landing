import type { CSSProperties } from "react"

import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import Typography from "@/components/ui/Typography"
import { builtForNepal } from "@/lib/landing/content"

// Three calm tiers: the standard section header, one row of four local
// features (open, no cards), then a route line through the cities served.
// The route draws itself in once it scrolls into view (globals.css,
// `.nepal-route`); with reduced motion it sits finished. City names stay as
// real text in an ordered list.
const BuiltForNepal = () => (
  <Section id="built-for-nepal" labelledBy="nepal-title">
    <SectionHeader
      intro={builtForNepal}
      titleId="nepal-title"
      titleClassName="max-w-[12em]"
    />

    <ul className="reveal-stagger mt-section-content grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {builtForNepal.highlights.map(({ title, description, icon: Icon }) => (
        <li key={title} className="flex flex-col">
          <Icon aria-hidden className="size-6 text-brand" strokeWidth={1.75} />
          <Typography variant="cardTitle" className="mt-5">
            {title}
          </Typography>
          <Typography variant="body" className="mt-1 opacity-60">
            {description}
          </Typography>
        </li>
      ))}
    </ul>

    <div className="nepal-route mt-section-content border-t border-line-dark pt-8 lg:pt-10">
      <Typography variant="body" className="opacity-60">
        {builtForNepal.citiesLabel}
      </Typography>

      <div className="relative mt-6 lg:mt-8">
        {/* Track and orange fill, from the first stop's dot to the last. */}
        <div
          aria-hidden
          className="absolute top-4 bottom-4 left-1.5 w-px -translate-x-1/2 bg-line-strong lg:top-1.5 lg:right-[calc(100%/14)] lg:bottom-auto lg:left-[calc(100%/14)] lg:h-px lg:w-auto lg:translate-x-0 lg:-translate-y-1/2"
        >
          <div className="nepal-route-fill size-full bg-brand" />
        </div>

        <ol className="relative flex flex-col lg:grid lg:grid-cols-7">
          {builtForNepal.cities.map((city, index) => (
            <li
              key={city.name}
              style={{ "--i": index } as CSSProperties}
              className="nepal-route-stop flex h-8 items-center gap-4 lg:h-auto lg:flex-col lg:text-center"
            >
              <span
                aria-hidden
                className="nepal-route-dot size-3 shrink-0 rounded-full border-2 border-brand bg-surface-dark"
              />
              <Typography variant="body" as="span" className="font-medium">
                {city.name}
              </Typography>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </Section>
)

export default BuiltForNepal
