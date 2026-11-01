import Image from "next/image"
import Link from "next/link"

import LandingButton from "@/components/landing/primitives/LandingButton"
import Typography from "@/components/ui/Typography"
import { planCta } from "@/lib/pricing/content"
import type { Plan } from "@/lib/pricing/types"
import { linkTarget } from "@/lib/site"
import { cn } from "@/lib/utils"
import arrowRight from "@/public/landing/pricing/arrow-right.svg"
import barbell from "@/public/landing/pricing/barbell.svg"
import checkDark from "@/public/landing/pricing/check-dark.svg"
import checkLight from "@/public/landing/pricing/check-light.svg"
import crossDark from "@/public/landing/pricing/cross-dark.svg"
import crossLight from "@/public/landing/pricing/cross-light.svg"
import popularFrame from "@/public/landing/pricing/popular-frame.webp"

const PlanBody = ({ plan }: { plan: Plan }) => {
  const check = plan.popular ? checkDark : checkLight
  const cross = plan.popular ? crossDark : crossLight

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-plan px-5 py-6 lg:px-6.5 lg:pt-7.5 lg:pb-8",
        plan.popular ? "bg-surface-plan text-ink" : "bg-brand-soft text-white"
      )}
    >
      <Typography as="h2" variant="cardTitle" className="font-normal">
        {plan.name}
      </Typography>

      <p className="mt-3 flex items-baseline gap-2">
        <span className="text-title-lg">{plan.price}</span>
        <span className="text-body opacity-70">{plan.period}</span>
      </p>

      <Typography variant="badge" as="p" className="mt-3 opacity-70">
        {plan.description}
      </Typography>

      <LandingButton asChild className="mt-6 w-full">
        <Link href={planCta.href} {...linkTarget(planCta.href)}>
          {planCta.label}
          <span className="sr-only"> with the {plan.name} plan</span>
          <Image src={arrowRight} alt="" />
        </Link>
      </LandingButton>

      <ul className="mt-7 flex flex-col gap-4 lg:gap-5">
        {plan.features.map((feature) => (
          <li key={feature.label} className="flex items-center gap-3">
            <span className="flex w-5.5 shrink-0 justify-center">
              <Image
                src={feature.included ? check : cross}
                alt={feature.included ? "Included:" : "Not included:"}
              />
            </span>
            <Typography
              as="span"
              variant="bodyLg"
              className={cn(!feature.included && "opacity-60")}
            >
              {feature.label}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

// The popular plan sits in a gradient frame that rises 76px above the other
// two cards and carries the "Most Popular" label (node 1:863).
const PlanCard = ({ plan }: { plan: Plan }) => {
  if (!plan.popular) {
    return (
      <article className="lg:mt-19">
        <PlanBody plan={plan} />
      </article>
    )
  }

  return (
    <article className="relative isolate flex flex-col overflow-hidden rounded-tile px-1.75 pb-2.25">
      <Image
        src={popularFrame}
        alt=""
        fill
        preload
        sizes="(min-width: 1024px) 507px, 92vw"
        className="-z-10 object-cover"
      />
      <p className="flex h-14 items-center justify-center gap-2 text-body-lg font-medium text-white lg:h-18.5">
        <Image src={barbell} alt="" className="-rotate-[45.75deg]" />
        Most Popular
      </p>
      <div className="flex-1">
        <PlanBody plan={plan} />
      </div>
    </article>
  )
}

export default PlanCard
