"use client"

import { Accordion as AccordionPrimitive } from "radix-ui"

import type { Feature } from "@/lib/landing/types"

type FeatureListProps = {
  features: Feature[]
}

// Single-open list: one feature is always expanded (the first by default),
// matching the Figma state. Built on the Radix primitive directly because the
// shadcn Accordion's card chrome and chevrons don't fit this design.
const FeatureList = ({ features }: FeatureListProps) => (
  <AccordionPrimitive.Root
    type="single"
    defaultValue={features[0]?.title}
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
            <AccordionPrimitive.Trigger className="w-full px-3 py-5 text-left text-title font-medium transition-colors duration-300 ease-standard outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 data-[state=closed]:hover:text-brand data-[state=open]:pb-3 motion-reduce:transition-none lg:px-5 lg:py-6 lg:data-[state=open]:pb-4">
              {feature.title}
            </AccordionPrimitive.Trigger>
          </h3>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none">
          <p className="max-w-[33.5em] px-3 pb-6 text-body-lg lg:px-5">
            {feature.description}
          </p>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    ))}
  </AccordionPrimitive.Root>
)

export default FeatureList
