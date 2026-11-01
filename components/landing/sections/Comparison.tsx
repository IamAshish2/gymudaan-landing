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
  "sticky top-0 z-10 h-16 border-b border-line-dark bg-surface-dark px-4 font-medium lg:top-header lg:h-24 lg:px-6"
const cellClass = "border-l border-line-faint px-4 py-2.5 text-center"
// A 6px gap, then the tinted Gym Udaan column (nodes 1:383, 1:385).
const udaanClass = "border-l-6 border-l-surface-dark bg-brand-wash"

// A real table so screen readers announce the column for each mark. The
// header row pins while the rows scroll. From lg it pins under the page
// header, which needs the wrapper not to scroll. Below lg the wrapper scrolls
// sideways, so it is capped to the viewport and the header pins inside it.
const Comparison = () => (
  <Section id="comparison" labelledBy="comparison-title">
    <SectionHeader
      intro={comparison}
      titleId="comparison-title"
      titleClassName="max-w-[14.3em]"
    />

    <div
      tabIndex={0}
      role="region"
      aria-labelledby="comparison-title"
      className="mt-section-content -mr-gutter max-h-[calc(100svh-6rem)] overflow-auto overscroll-x-contain pr-gutter outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 lg:mr-0 lg:max-h-none lg:overflow-visible lg:pr-0"
    >
      <table className="w-full min-w-3xl table-fixed border-separate border-spacing-0 border border-line-faint">
        <colgroup>
          <col className="w-[33%]" />
          <col className="w-[22%]" />
          <col className="w-[22.5%]" />
          <col className="w-[22.5%]" />
        </colgroup>

        <thead>
          <tr>
            <th
              scope="col"
              className={cn(headClass, "text-left text-title lg:px-10.5")}
            >
              {comparison.featureLabel}
            </th>
            {comparison.columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  headClass,
                  "border-l border-l-line-faint text-center text-title-sm",
                  column.key === "udaan" && udaanClass
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="[&>tr:first-child>*]:pt-8.5 [&>tr:last-child>*]:pb-8">
          {comparison.rows.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="px-4 py-2.5 text-left text-body-lg font-medium lg:px-10.5"
              >
                <span className="flex items-center gap-3 lg:gap-3.5">
                  <span className="flex w-7 shrink-0 justify-center">
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
                      className="mx-auto size-8 lg:size-9.5"
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
