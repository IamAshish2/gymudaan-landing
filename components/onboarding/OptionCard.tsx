import Image from "next/image"

import OptionArtImage from "@/components/onboarding/OptionArtImage"
import Typography from "@/components/ui/Typography"
import { ICheck } from "@/lib/icons"
import type { OptionArt } from "@/lib/onboarding/types"
import { cn } from "@/lib/utils"

const ART_SLOT_HEIGHT = 181
const STAGGER_MS = 60

type OptionCardProps = {
  groupName: string
  type: "radio" | "checkbox"
  label: string
  art: OptionArt
  price?: string
  features?: string[]
  /** Text on the tab above the card, e.g. "Popular". */
  tag?: string
  /** Gives the card a stronger resting border, for the plan being promoted. */
  featured?: boolean
  checked: boolean
  /** Position in the grid, so cards enter one after another. */
  index: number
  onToggle: () => void
}

const OptionCard = ({
  groupName,
  type,
  label,
  art,
  price,
  features,
  tag,
  featured = false,
  checked,
  index,
  onToggle,
}: OptionCardProps) => {
  const { slotWidth } = art

  return (
    <label
      style={{ animationDelay: `${index * STAGGER_MS}ms` }}
      className={cn(
        "group @container relative flex h-full cursor-pointer flex-col items-center gap-3 rounded-chip border border-line-option px-3 pt-4.5 pb-4.25 transition-[translate,scale,border-color,box-shadow] duration-300 ease-standard select-none hover:border-brand/50 hover:shadow-option motion-safe:animate-option-rise motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.98]",
        "has-focus-visible:ring-[3px] has-focus-visible:ring-brand/60",
        featured && "border-brand/40 lg:shadow-option",
        checked && "border-brand shadow-option hover:border-brand",
        price && "px-5 pt-4.25"
      )}
    >
      <input
        type={type}
        name={groupName}
        checked={checked}
        onChange={onToggle}
        className="sr-only"
      />

      {/* Pulses once on selecting, and on returning to the step as a reminder. */}
      {checked && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-chip motion-safe:animate-option-ring"
        />
      )}

      {tag && (
        <Typography
          variant="body"
          as="span"
          className="absolute -top-onboarding-tab left-1/2 flex h-7.5 min-w-32 -translate-x-1/2 items-center justify-center rounded-t-photo bg-brand px-3 whitespace-nowrap text-white"
        >
          {tag}
        </Typography>
      )}

      <span
        className={cn(
          "relative block w-full overflow-hidden transition-[scale] duration-300 ease-spring motion-safe:group-hover:scale-[1.04]",
          checked && "motion-safe:animate-option-pop"
        )}
        style={{
          maxWidth: slotWidth,
          aspectRatio: `${slotWidth} / ${ART_SLOT_HEIGHT}`,
        }}
      >
        <OptionArtImage art={art} />
      </span>

      <span
        className={cn(
          "flex flex-col items-center text-center",
          !features && "mt-auto"
        )}
      >
        <Typography variant="bodyLg" as="span" className="text-black">
          {label}
        </Typography>
        {price && (
          <Typography
            variant="bodyLg"
            as="span"
            className="font-medium text-status-alert"
          >
            {price}
          </Typography>
        )}
      </span>

      {features && (
        <ul className="flex w-full flex-col gap-1.5 border-t border-line-light pt-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <ICheck className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
              <Typography variant="badge" className="text-ink-subtle">
                {feature}
              </Typography>
            </li>
          ))}
        </ul>
      )}

      {/* Stays mounted so it can spring out on deselect as well as in. */}
      <Image
        src="/onboarding/check-badge.svg"
        alt=""
        width={24}
        height={24}
        className={cn(
          "absolute right-2 transition-[scale,rotate,opacity] duration-300 ease-spring motion-reduce:transition-none",
          // Narrow cards and plan cards have no spare width beside the text.
          price ? "top-2" : "top-2 @min-[16rem]:top-auto @min-[16rem]:bottom-2",
          checked ? "scale-100 rotate-0" : "scale-0 -rotate-45 opacity-0"
        )}
      />
    </label>
  )
}

export default OptionCard
