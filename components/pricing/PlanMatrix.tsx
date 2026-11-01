import Image from "next/image"
import Link from "next/link"

import LandingButton from "@/components/landing/primitives/LandingButton"
import Section from "@/components/landing/primitives/Section"
import { matrix, matrixLabel, planCta, plans } from "@/lib/pricing/content"
import type { PlanMatrixValue } from "@/lib/pricing/types"
import { linkTarget } from "@/lib/site"
import statusNo from "@/public/landing/pricing/status-no.svg"
import statusYes from "@/public/landing/pricing/status-yes.svg"

const planCellClass = "pl-5 lg:pl-13"
const headClass =
  "sticky top-0 z-10 border-b border-line-dark bg-surface-dark pt-3 pb-5 text-left text-title font-medium lg:top-header"

const MatrixValue = ({ value }: { value: PlanMatrixValue }) =>
  typeof value === "string" ? (
    <span className="text-body-lg font-medium">{value}</span>
  ) : (
    <Image
      src={value ? statusYes : statusNo}
      alt={value ? "Included" : "Not included"}
    />
  )

// One <tbody> per feature group, so the rules between plan columns break at
// each group heading as they do in Figma (node 1:951). The header row pins as
// in Comparison: under the page header from lg, inside the wrapper below it.
const PlanMatrix = () => (
  <Section id="compare-plans" labelledBy="compare-plans-title">
    <div
      tabIndex={0}
      role="region"
      aria-labelledby="compare-plans-title"
      className="relative -mr-gutter max-h-[calc(100svh-6rem)] overflow-auto overscroll-x-contain pr-gutter outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60 lg:mr-0 lg:max-h-none lg:overflow-visible lg:pr-0"
    >
      <table className="w-full min-w-3xl table-fixed border-separate border-spacing-0">
        <caption id="compare-plans-title" className="sr-only">
          Compare plans
        </caption>
        <colgroup>
          <col className="w-[32%]" />
          <col className="w-[24.4%]" />
          <col className="w-[24.4%]" />
          <col className="w-[19.2%]" />
        </colgroup>

        <thead>
          <tr>
            <th scope="col" className={headClass}>
              {matrixLabel}
            </th>
            {plans.map((plan) => (
              <th
                key={plan.name}
                scope="col"
                className={`${planCellClass} ${headClass}`}
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
                  className="py-2.5 pr-4 text-left text-body-lg font-medium text-white/60"
                >
                  {row.label}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={plans[index]?.name}
                    className={`${planCellClass} border-l-2 border-line-strong py-2.5`}
                  >
                    <MatrixValue value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}

        <tfoot>
          <tr>
            <td />
            {plans.map((plan) => (
              <td key={plan.name} className="pt-6 pl-5 lg:pl-9">
                <LandingButton
                  variant={plan.popular ? "light" : "dark"}
                  size="sm"
                  asChild
                  className="lg:px-7 lg:py-2 lg:text-title-sm"
                >
                  <Link href={planCta.href} {...linkTarget(planCta.href)}>
                    {planCta.label}
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
