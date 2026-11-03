/**
 * How an illustration sits in its card. The Figma art ships as sprite sheets,
 * so `crop` holds the sheet's size and offset as percentages of the slot.
 */
export type OptionArt = {
  src: string
  sheetWidth: number
  sheetHeight: number
  /** Slot width at the 1728 frame; every slot is 181px tall. */
  slotWidth: number
  crop: { width: number; height: number; left: number; top: number }
}

export type OnboardingOption = {
  id: string
  label: string
  art: OptionArt
}

export type OnboardingPlan = OnboardingOption & {
  price: string
  yearlyPrice: string
  features: string[]
  popular?: boolean
}

export type OnboardingStepCopy = {
  title: string
  subtitle: string
}

export type LabelledValue = {
  id: string
  label: string
}
