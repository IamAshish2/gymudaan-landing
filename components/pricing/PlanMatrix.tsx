import Image from "next/image"
import Link from "next/link"

import LandingButton from "@/components/landing/primitives/LandingButton"
import Section from "@/components/landing/primitives/Section"
import {
  matrix,
  matrixCtaLabel,
  matrixLabel,
  planCta,
  plans,
} from "@/lib/pricing/content"
import type { PlanMatrixValue } from "@/lib/pricing/types"
import { linkTarget } from "@/lib/site"
import { cn } from "@/lib/utils"
import statusNo from "@/public/landing/pricing/status-no.svg"
import statusYes from "@/public/landing/pricing/status-yes.svg"

// Below lg the plan columns are narrow (about 70px on a small phone), so their
// content centres; from lg it sits left with the Figma indent.
const planCellClass = "px-0 text-center sm:px-1 lg:pr-0 lg:pl-13 lg:text-left"
const headClass =
  "sticky top-header-sm z-10 border-b border-line-dark bg-surface-dark pt-3 pb-5 text-left font-medium lg:top-header"

const MatrixValue = ({ value }: { value: PlanMatrixValue }) =>
  typeof value === "string" ? (
    <span className="text-badge font-medium sm:text-body lg:text-body-lg">
      {value}
    </span>
  ) : (
    <Image
      src={value ? statusYes : statusNo}
      alt={value ? "Included" : "Not included"}
      className="inline-block"
    />
  )

// One <tbody> per feature group, so the rules between plan columns break at
// each group heading as they do in Figma (node 1:951). The table always fits
// the screen (nothing scrolls inside the page) and its header row pins under
// the fixed page header, as in Comparison.
const PlanMatrix = () => (
  <Section id="compare-plans" labelledBy="compare-plans-title">
    <div className="relative">
      <table className="w-full table-fixed border-separate border-spacing-0">
        <caption id="compare-plans-title" className="sr-only">
          Compare plans
        </caption>
        <colgroup>
          <col className="w-[34%] lg:w-[32%]" />
          <col className="w-[22%] lg:w-[24.4%]" />
          <col className="w-[22%] lg:w-[24.4%]" />
          <col className="w-[22%] lg:w-[19.2%]" />
        </colgroup>

        <thead>
          <tr>
            <th
              scope="col"
              className={cn(headClass, "pr-2 text-title-sm lg:text-title")}
            >
              {matrixLabel}
            </th>
            {plans.map((plan) => (
              <th
                key={plan.name}
                scope="col"
                className={cn(
                  headClass,
                  planCellClass,
                  "text-badge sm:text-body lg:text-title"
                )}
              >
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>

        {matrix.map((group, groupIndex) => (
          <tbody key={group.title ?? groupIndex}>
            {group.title ? (
              <tr>
                <th
                  scope="colgroup"
                  colSpan={plans.length + 1}
                  className="pt-7 pb-3.5 text-left text-title-sm font-medium"
                >
                  {group.title}
                </th>
              </tr>
            ) : null}
            {group.rows.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="py-2.5 pr-2 text-left text-body font-medium text-white/60 sm:pr-4 lg:text-body-lg"
                >
                  {row.label}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={plans[index]?.name}
                    className={cn(
                      planCellClass,
                      "border-l-2 border-line-strong py-2.5"
                    )}
                  >
                    <MatrixValue value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}

        {/* Below lg each plan card above already has this button, and the
            columns are too narrow for it. */}
        <tfoot className="max-lg:hidden">
          <tr>
            <td />
            {plans.map((plan) => (
              <td key={plan.name} className="pt-6 pl-5 lg:pl-9">
                <LandingButton
                  variant={plan.popular ? "light" : "dark"}
                  size="sm"
                  asChild
                  // Full size only from xl: below that the Platinum column is
                  // narrower than the button.
                  className="xl:px-7 xl:py-2 xl:text-title-sm"
                >
                  <Link href={planCta.href} {...linkTarget(planCta.href)}>
                    {matrixCtaLabel}
                    <span className="sr-only"> with the {plan.name} plan</span>
                  </Link>
                </LandingButton>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  </Section>
)

export default PlanMatrix
