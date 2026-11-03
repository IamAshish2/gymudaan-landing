"use client"

import { Accordion as AccordionPrimitive } from "radix-ui"

import FeatureArt from "@/components/landing/sections/FeatureArt"
import type { Feature } from "@/lib/landing/types"

type FeatureListProps = {
  features: Feature[]
  value: string
  onValueChange: (value: string) => void
}

// Single-open list: one feature is always expanded (the first by default),
// matching the Figma state. Below lg each feature carries its own image, since
// the side panel would sit far from the row being tapped. Built on the Radix
// primitive directly because the shadcn Accordion's card chrome and chevrons
// don't fit this design.
const FeatureList = ({ features, value, onValueChange }: FeatureListProps) => (
  <AccordionPrimitive.Root
    type="single"
    value={value}
    onValueChange={onValueChange}
    className="flex flex-col"
  >
    {features.map((feature) => (
      <AccordionPrimitive.Item
        key={feature.title}
        value={feature.title}
        className="border-b border-line-dark"
      >
        <AccordionPrimitive.Header asChild>
          <h3>
            <AccordionPrimitive.Trigger className="w-full px-3 py-5 text-left text-title font-medium transition-colors duration-300 ease-standard outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 data-[state=closed]:hover:text-brand data-[state=open]:pb-3 data-[state=open]:text-brand motion-reduce:transition-none lg:px-5 lg:py-6 lg:data-[state=open]:pb-4">
              {feature.title}
            </AccordionPrimitive.Trigger>
          </h3>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none">
          <p className="max-w-[33.5em] px-3 pb-6 text-body-lg lg:px-5">
            {feature.description}
          </p>
          {/* Sized to the art itself, so wide images leave no dead space. */}
          <div
            className="relative mx-3 mb-6 lg:hidden"
            style={{
              aspectRatio: feature.imageCrop
                ? "772 / 570"
                : `${feature.image.width} / ${feature.image.height}`,
            }}
          >
            <FeatureArt feature={feature} sizes="92vw" />
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    ))}
  </AccordionPrimitive.Root>
)

export default FeatureList
