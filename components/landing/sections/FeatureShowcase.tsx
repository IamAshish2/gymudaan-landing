"use client"

import { useState } from "react"

import FeatureArt from "@/components/landing/sections/FeatureArt"
import FeatureList from "@/components/landing/sections/FeatureList"
import type { Feature } from "@/lib/landing/types"
import { cn } from "@/lib/utils"

type FeatureShowcaseProps = {
  features: Feature[]
}

// The open feature picks the image beside the list. Every image stays mounted
// and cross-fades, so switching is instant once the section has loaded.
const FeatureShowcase = ({ features }: FeatureShowcaseProps) => {
  const [active, setActive] = useState(features[0]?.title ?? "")

  return (
    // Top-aligned so the list and image hold still as descriptions change length.
    <div className="mt-section-content grid items-start gap-10 lg:grid-cols-[718fr_772fr] lg:gap-15">
      <FeatureList
        features={features}
        value={active}
        onValueChange={setActive}
      />

      <div className="relative hidden aspect-[772/570] w-full lg:block">
        {features.map((feature) => {
          const isActive = feature.title === active

          return (
            <div
              key={feature.title}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 transition-[opacity,scale] duration-500 ease-standard motion-reduce:transition-none",
                isActive ? "scale-100" : "scale-[0.98] opacity-0"
              )}
            >
              <FeatureArt
                feature={feature}
                sizes="(min-width: 1728px) 772px, 45vw"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FeatureShowcase
