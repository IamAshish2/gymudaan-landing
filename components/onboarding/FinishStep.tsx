"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

import LandingButton from "@/components/landing/primitives/LandingButton"
import Typography from "@/components/ui/Typography"
import {
  finishCopy,
  onboardingPlans,
  paymentMethods,
} from "@/lib/onboarding/content"
import type { OnboardingValues } from "@/lib/onboarding/validations"
import { ROUTES } from "@/lib/routes"

type FinishStepProps = {
  values: OnboardingValues
  note?: string
}

const FinishStep = ({ values, note }: FinishStepProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    containerRef.current?.focus({ preventScroll: true })
  }, [])

  const plan = onboardingPlans.find((item) => item.id === values.plan)
  const method = paymentMethods.find((item) => item.id === values.paymentMethod)

  const rows = [
    { label: "Plan", value: plan?.label ?? "" },
    { label: "Annual Price", value: plan?.price ?? "" },
    { label: "Payment", value: method?.label ?? "" },
  ]

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="flex flex-1 flex-col items-center justify-center px-onboarding-panel-x py-onboarding-panel-y text-center outline-none"
    >
      <svg
        viewBox="0 0 80 80"
        aria-hidden
        className="size-20 fill-none stroke-brand stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]"
      >
        <circle
          cx="40"
          cy="40"
          r="37"
          pathLength={1}
          strokeDasharray={1}
          className="origin-center -rotate-90 motion-safe:animate-draw-ring"
        />
        <path
          d="M25 41.5 35.5 52 56 30"
          pathLength={1}
          strokeDasharray={1}
          className="stroke-[4] motion-safe:animate-draw-check"
        />
      </svg>

      <div
        style={{ animationDelay: "350ms" }}
        className="mt-8 flex w-full max-w-onboarding-form flex-col items-center motion-safe:animate-option-rise"
      >
        <Typography variant="title" as="h1">
          {finishCopy.title(values.businessName)}
        </Typography>
        <Typography variant="bodyLg" className="mt-1 text-ink-muted">
          {finishCopy.subtitle}
        </Typography>

        <dl className="mt-onboarding-tight flex w-full flex-col gap-2 rounded-photo bg-surface-tile px-6.5 py-5">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4">
              <Typography variant="body" as="dt" className="text-ink-muted">
                {label}
              </Typography>
              <Typography variant="body" as="dd" className="text-ink">
                {value}
              </Typography>
            </div>
          ))}
        </dl>

        <LandingButton
          asChild
          className="mt-onboarding-tight h-12.5 px-9 transition-[color,background-color,translate,scale] focus-visible:ring-offset-surface-light motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-95"
        >
          <Link href={ROUTES.home}>{finishCopy.cta}</Link>
        </LandingButton>

        {note && (
          <Typography variant="badge" as="p" className="mt-4 text-ink-muted">
            {note}
          </Typography>
        )}
      </div>
    </div>
  )
}

export default FinishStep
