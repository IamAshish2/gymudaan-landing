"use client"

import { useId, useState, type ReactNode } from "react"
import Link from "next/link"
import { Slider as SliderPrimitive } from "radix-ui"

import LandingButton from "@/components/landing/primitives/LandingButton"
import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import Typography from "@/components/ui/Typography"
import {
  ICheck,
  IMapPin,
  IMinus,
  IPlus,
  IPuzzle,
  ISlidersHorizontal,
  IUsers,
  type LucideIcon,
} from "@/lib/icons"
import {
  addOns,
  calculatorIntro,
  calculatorText,
  formatMembers,
  initialSelection,
  MAX_LOCATIONS,
  memberScale,
  membersToSlider,
  MIN_LOCATIONS,
  recommendPlan,
  sliderToMembers,
} from "@/lib/pricing/calculator"
import { cn } from "@/lib/utils"

const controlBoxClass =
  "inline-flex shrink-0 items-center rounded-badge border border-line-strong"

const stepButtonClass =
  "flex size-11 items-center justify-center lg:size-9 transition-colors duration-300 ease-standard outline-none hover:text-brand focus-visible:ring-[3px] focus-visible:ring-brand/60 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none [&_svg]:size-4"

const IconTile = ({ icon: Icon }: { icon: LucideIcon }) => (
  <span
    aria-hidden
    className="flex size-11.5 shrink-0 items-center justify-center rounded-button bg-brand-soft text-brand"
  >
    <Icon className="size-5.5" />
  </span>
)

type StepProps = {
  icon: LucideIcon
  title: ReactNode
  titleId?: string
  description: string
  /** Sits beside the title from sm up, below it on phones. */
  control?: ReactNode
  children?: ReactNode
}

const Step = ({
  icon,
  title,
  titleId,
  description,
  control,
  children,
}: StepProps) => (
  <div className="flex gap-4">
    <IconTile icon={icon} />
    <div className="min-w-0 flex-1">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Typography as="h3" variant="cardTitle" id={titleId}>
            {title}
          </Typography>
          <Typography variant="body" className="opacity-80">
            {description}
          </Typography>
        </div>
        {control}
      </div>
      {children}
    </div>
  </div>
)

// Members, locations and add-ons on the left; the plan they point to on the
// right, updating as the visitor changes anything.
const PricingCalculator = () => {
  const [position, setPosition] = useState(() =>
    Math.round(membersToSlider(initialSelection.members))
  )
  const [locations, setLocations] = useState(initialSelection.locations)
  const [selectedAddOns, setSelectedAddOns] = useState(initialSelection.addOns)
  const addOnsTitleId = useId()

  const members = sliderToMembers(position)
  const plan = recommendPlan({
    members,
    locations,
    addOns: selectedAddOns,
  })
  const { result } = calculatorText

  const toggleAddOn = (id: string, checked: boolean) =>
    setSelectedAddOns((current) =>
      checked ? [...current, id] : current.filter((item) => item !== id)
    )

  const summary = [
    { icon: IUsers, label: result.members, value: formatMembers(members) },
    { icon: IMapPin, label: result.locations, value: String(locations) },
    {
      icon: IPuzzle,
      label: result.addOns,
      value: String(selectedAddOns.length),
    },
  ]

  return (
    <Section id="calculator" labelledBy="calculator-title" className="pb-0">
      <SectionHeader intro={calculatorIntro} titleId="calculator-title" />

      <div className="mt-section-content grid gap-6 lg:grid-cols-[488fr_454fr] lg:gap-5">
        <div className="flex flex-col gap-9 rounded-panel border border-line-dark px-5 py-6 lg:gap-11 lg:px-6 lg:py-7">
          <Step
            icon={ISlidersHorizontal}
            title={calculatorText.makePlan.title}
            description={calculatorText.makePlan.description}
          />

          <Step
            icon={IUsers}
            title={calculatorText.members.title}
            description={calculatorText.members.description}
            control={
              <Typography
                as="span"
                variant="body"
                aria-hidden
                className={cn(
                  controlBoxClass,
                  "self-start px-2.5 py-1 sm:self-auto"
                )}
              >
                <span className="text-brand">{formatMembers(members)}</span>
                &nbsp;{calculatorText.members.unit}
              </Typography>
            }
          >
            <SliderPrimitive.Root
              value={[position]}
              onValueChange={([next]) => {
                if (next !== undefined) setPosition(next)
              }}
              min={0}
              max={100}
              step={1}
              className="relative mt-5 flex h-5 w-full touch-none items-center select-none"
            >
              <SliderPrimitive.Track className="relative h-1 grow overflow-hidden rounded-full bg-white">
                <SliderPrimitive.Range className="absolute h-full bg-brand" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb
                aria-label={calculatorText.members.title}
                aria-valuetext={`${formatMembers(members)} ${calculatorText.members.unit}`}
                className="block size-4 rounded-full border-2 border-brand bg-white transition-shadow duration-300 ease-standard outline-none hover:ring-4 hover:ring-brand/25 focus-visible:ring-[3px] focus-visible:ring-brand/60 motion-reduce:transition-none"
              />
            </SliderPrimitive.Root>
            <div
              aria-hidden
              className="mt-2 grid grid-cols-3 text-badge opacity-80"
            >
              <span>{memberScale.ticks[0]}</span>
              <span className="text-center">{memberScale.ticks[1]}</span>
              <span className="text-right">{memberScale.ticks[2]}</span>
            </div>
          </Step>

          <Step
            icon={IMapPin}
            title={calculatorText.locations.title}
            description={calculatorText.locations.description}
            control={
              <div
                role="group"
                aria-label={calculatorText.locations.title}
                className={cn(controlBoxClass, "self-start sm:self-auto")}
              >
                <button
                  type="button"
                  aria-label={calculatorText.locations.decrease}
                  disabled={locations <= MIN_LOCATIONS}
                  onClick={() => setLocations(locations - 1)}
                  className={stepButtonClass}
                >
                  <IMinus />
                </button>
                <output
                  aria-live="polite"
                  className="flex h-11 min-w-11 items-center justify-center border-x border-line-strong px-2 text-body lg:h-9 lg:min-w-10"
                >
                  {locations}
                </output>
                <button
                  type="button"
                  aria-label={calculatorText.locations.increase}
                  disabled={locations >= MAX_LOCATIONS}
                  onClick={() => setLocations(locations + 1)}
                  className={stepButtonClass}
                >
                  <IPlus />
                </button>
              </div>
            }
          />

          <Step
            icon={IPuzzle}
            titleId={addOnsTitleId}
            title={
              <>
                {calculatorText.addOns.title}{" "}
                <span className="text-body font-normal opacity-80">
                  {calculatorText.addOns.optional}
                </span>
              </>
            }
            description={calculatorText.addOns.description}
          >
            <ul
              role="group"
              aria-labelledby={addOnsTitleId}
              className="mt-5 flex flex-col gap-3"
            >
              {addOns.map((addOn) => {
                const checked = selectedAddOns.includes(addOn.id)

                return (
                  <li key={addOn.id}>
                    <label className="flex cursor-pointer items-start gap-4 rounded-button border border-line-dark px-4 py-3 transition-colors duration-300 ease-standard hover:border-line-strong has-checked:border-line-strong motion-reduce:transition-none">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) =>
                          toggleAddOn(addOn.id, event.target.checked)
                        }
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden
                        className="mt-1 flex size-4.5 shrink-0 items-center justify-center rounded-chip border border-line-strong bg-surface-card transition-colors duration-300 ease-standard peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-[3px] peer-focus-visible:ring-brand/60 motion-reduce:transition-none [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100"
                      >
                        <ICheck className="size-3.5" strokeWidth={3} />
                      </span>
                      <span className="flex flex-col">
                        <Typography
                          as="span"
                          variant="body"
                          className="font-medium"
                        >
                          {addOn.label}
                        </Typography>
                        <Typography
                          as="span"
                          variant="badge"
                          className="opacity-70"
                        >
                          {addOn.description}
                        </Typography>
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </Step>
        </div>

        <div className="rounded-panel border border-line-dark p-4 lg:p-6">
          <div className="flex h-full flex-col rounded-panel bg-brand-wash px-5 py-6 lg:px-6 lg:py-7">
            <Typography
              variant="badge"
              className="w-fit rounded-full bg-brand px-3.5 py-1.5"
            >
              {result.badge}
            </Typography>

            <div
              key={plan.name}
              aria-live="polite"
              aria-atomic
              className="mt-5 animate-in duration-500 fade-in-0 motion-reduce:animate-none"
            >
              <Typography as="h3" variant="titleLg">
                {plan.name}
              </Typography>
              <p className="mt-1 flex items-baseline gap-1.5">
                {plan.currency ? (
                  <Typography as="span" variant="body">
                    {plan.currency}
                  </Typography>
                ) : null}
                <Typography as="span" variant="titleLg" className="text-brand">
                  {plan.amount}
                </Typography>
                <Typography as="span" variant="body">
                  {result.period}
                </Typography>
              </p>
              <Typography variant="body" className="mt-1 opacity-80">
                {plan.description}
              </Typography>
            </div>

            <dl
              aria-label={result.summaryLabel}
              className="mt-10 flex flex-col gap-3 lg:mt-12"
            >
              {summary.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4"
                >
                  <dt className="flex items-center gap-3 text-body opacity-80">
                    <Icon aria-hidden className="size-4.5 text-brand" />
                    {label}
                  </dt>
                  <dd className="text-body font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto pt-10">
              <LandingButton asChild className="w-full">
                <Link href={result.cta.href}>{result.cta.label}</Link>
              </LandingButton>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default PricingCalculator
