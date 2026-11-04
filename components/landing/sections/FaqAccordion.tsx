"use client"

import Image from "next/image"
import { Accordion as AccordionPrimitive } from "radix-ui"

import type { Faq } from "@/lib/landing/types"
import plus from "@/public/landing/faq/plus.svg"

type FaqAccordionProps = {
  items: Faq[]
  defaultOpen: number
}

// Bordered single-open accordion; the "+" turns 45° into "×" when open.
// Uses the Radix primitive directly — the design's separate bordered items
// don't fit the shadcn Accordion's shared card.
//
// Every answer is rendered (forceMount) so all of them are in the server HTML,
// matching the FAQPage structured data. Closed panels collapse with a
// grid-template-rows transition (same 200ms CSS `ease-out` as the
// accordion-up/down keyframes it replaces), not a keyframe animation: transitions don't run on first paint,
// so nothing flashes before hydration. Visibility transitions too, so a closing
// panel stays visible while it collapses and then leaves the accessibility tree.
// The transition sits on an inner wrapper: Radix zeroes transition-duration on
// the Content element itself while it measures, which would skip it.
const FaqAccordion = ({ items, defaultOpen }: FaqAccordionProps) => (
  <AccordionPrimitive.Root
    type="single"
    collapsible
    defaultValue={items[defaultOpen]?.question}
    className="flex flex-col gap-5"
  >
    {items.map((item) => (
      <AccordionPrimitive.Item
        key={item.question}
        value={item.question}
        className="rounded-button border border-line-dark"
      >
        <AccordionPrimitive.Header asChild>
          <h3>
            <AccordionPrimitive.Trigger className="group/faq flex w-full items-center justify-between gap-6 rounded-button px-5 py-5 text-left text-title-sm font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 data-[state=open]:pb-3 lg:px-7 lg:py-6.5 lg:data-[state=open]:pb-4">
              {item.question}
              <Image
                src={plus}
                alt=""
                className="size-4.5 shrink-0 transition-transform duration-300 ease-standard group-data-[state=open]/faq:rotate-45 motion-reduce:transition-none"
              />
            </AccordionPrimitive.Trigger>
          </h3>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content forceMount className="group/panel">
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows,visibility] duration-200 ease-[ease-out] group-data-[state=closed]/panel:invisible group-data-[state=open]/panel:grid-rows-[1fr] motion-reduce:transition-none">
            <div className="min-h-0 overflow-hidden">
              <p className="max-w-[32.2em] px-5 pb-6 text-body-lg opacity-80 lg:px-7 lg:pb-7">
                {item.answer}
              </p>
            </div>
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    ))}
  </AccordionPrimitive.Root>
)

export default FaqAccordion
