"use client"

import Image from "next/image"
import { Tabs as TabsPrimitive } from "radix-ui"

import type { ControlTab } from "@/lib/landing/types"

type ControlTabsProps = {
  tabs: ControlTab[]
}

// Four tab cards over one large screenshot. The active card carries the
// orange top rule from Figma (node 1:311). Radix handles roving focus and
// arrow-key navigation between the cards.
const ControlTabs = ({ tabs }: ControlTabsProps) => (
  <TabsPrimitive.Root
    defaultValue={tabs[0]?.id}
    className="mt-6 flex flex-col gap-8 lg:mt-8 lg:gap-14"
  >
    <TabsPrimitive.List
      aria-label="Product areas"
      className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5"
    >
      {tabs.map((tab) => (
        <TabsPrimitive.Trigger
          key={tab.id}
          value={tab.id}
          className="group/tab relative flex items-center gap-2.5 rounded-card border border-line-light bg-surface-light px-3 py-3 text-left text-title-sm font-normal text-ink transition-colors duration-300 ease-standard outline-none hover:border-ink/15 focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:transition-none sm:px-5 sm:py-5 lg:gap-2.5 lg:py-6.5 lg:pr-5 lg:pl-8"
        >
          <span
            aria-hidden
            className="absolute top-0 left-6 h-0.5 w-[41%] -translate-y-px rounded-full bg-[linear-gradient(90deg,transparent,var(--color-brand)_20%,var(--color-brand)_80%,transparent)] opacity-0 transition-opacity duration-300 group-data-[state=active]/tab:opacity-100 motion-reduce:transition-none"
          />
          <span className="flex size-10 shrink-0 items-center justify-center rounded-badge bg-surface-tile lg:h-11.25 lg:w-12">
            <Image src={tab.icon} alt="" className="size-5 lg:size-6" />
          </span>
          <span className="min-w-0">{tab.label}</span>
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>

    {tabs.map((tab, index) => (
      <TabsPrimitive.Content
        key={tab.id}
        value={tab.id}
        className="overflow-hidden rounded-card border border-line-frame outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 data-[state=active]:animate-in data-[state=active]:fade-in-0 motion-reduce:data-[state=active]:animate-none"
      >
        <Image
          src={tab.image.src}
          alt={tab.image.alt}
          sizes="(min-width: 1728px) 1528px, 92vw"
          className="h-auto w-full"
          loading={index === 0 ? "eager" : "lazy"}
        />
      </TabsPrimitive.Content>
    ))}
  </TabsPrimitive.Root>
)

export default ControlTabs
