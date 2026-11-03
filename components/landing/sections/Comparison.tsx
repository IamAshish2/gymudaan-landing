import Image from "next/image"

import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import { comparison } from "@/lib/landing/content"
import type { ComparisonStatus } from "@/lib/landing/types"
import { cn } from "@/lib/utils"
import statusNo from "@/public/landing/comparison/status-no.svg"
import statusPartial from "@/public/landing/comparison/status-partial.svg"
import statusYes from "@/public/landing/comparison/status-yes.svg"

const STATUS = {
  yes: { src: statusYes, alt: "Included" },
  partial: { src: statusPartial, alt: "Partly included" },
  no: { src: statusNo, alt: "Not included" },
} satisfies Record<ComparisonStatus, { src: typeof statusYes; alt: string }>

const headClass =
  "sticky top-header-sm z-10 h-16 border-b border-line-dark bg-surface-dark px-0 font-medium sm:px-1 lg:top-header lg:h-24 lg:px-6"
const cellClass = "border-l border-line-faint px-1 py-2.5 text-center lg:px-4"
// A 6px gap, then the tinted Gym Udaan column (nodes 1:383, 1:385).
const udaanClass = "border-l-6 border-l-surface-dark bg-brand-wash"

// A real table so screen readers announce the column for each mark. It always
// fits the screen: below lg the feature column takes about half the width, the
// three mark columns share the rest under short headers, and nothing scrolls
// inside the page. The header row pins under the fixed page header.
const Comparison = () => (
  <Section id="comparison" labelledBy="comparison-title">
    <SectionHeader
      intro={comparison}
      titleId="comparison-title"
      titleClassName="max-w-[14.3em]"
    />

    <div className="mt-section-content">
      <table className="w-full table-fixed border-separate border-spacing-0 border border-line-faint">
        <caption className="sr-only">
          Gym Udaan compared with manual management and generic software
        </caption>
        <colgroup>
          <col className="w-[48%] lg:w-[33%]" />
          <col className="w-[17.33%] lg:w-[22%]" />
          <col className="w-[17.33%] lg:w-[22.5%]" />
          <col className="w-[17.33%] lg:w-[22.5%]" />
        </colgroup>

        <thead>
          <tr>
            <th
              scope="col"
              className={cn(
                headClass,
                "px-2 text-left text-title-sm sm:px-3 lg:px-10.5 lg:text-title"
              )}
            >
              {comparison.featureLabel}
            </th>
            {comparison.columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  headClass,
                  "border-l border-l-line-faint text-center text-badge leading-tight lg:text-title-sm lg:leading-normal",
                  column.key === "udaan" &&
                    cn(udaanClass, "shadow-[inset_0_2px_0_var(--color-brand)]")
                )}
              >
                <span className="lg:hidden">{column.shortLabel}</span>
                <span className="max-lg:hidden">{column.label}</span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="[&>tr:first-child>*]:pt-8.5 [&>tr:last-child>*]:pb-8">
          {comparison.rows.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="py-2.5 pr-1 pl-2 text-left text-badge font-medium sm:px-3 sm:text-body lg:px-10.5 lg:text-body-lg"
              >
                <span className="flex items-center gap-2 hyphens-auto sm:gap-2.5 lg:gap-3.5">
                  <span className="flex w-5 shrink-0 justify-center sm:w-6 lg:w-7">
                    <Image src={row.icon} alt="" className="h-auto w-auto" />
                  </span>
                  {row.label}
                </span>
              </th>
              {comparison.columns.map((column) => {
                const status = STATUS[row[column.key]]

                return (
                  <td
                    key={column.key}
                    className={cn(
                      cellClass,
                      column.key === "udaan" && udaanClass
                    )}
                  >
                    <Image
                      src={status.src}
                      alt={status.alt}
                      className={cn(
                        "mx-auto size-7 sm:size-8 lg:size-9.5",
                        // Competitors sit back so the Gym Udaan column leads.
                        column.key !== "udaan" && "opacity-55"
                      )}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Section>
)

export default Comparison
