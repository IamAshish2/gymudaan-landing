export type PlanFeature = {
  label: string
  included: boolean
}

export type Plan = {
  name: string
  price: string
  period: string
  description: string
  /** Renders the gradient "Most Popular" frame around the card. */
  popular?: boolean
  features: PlanFeature[]
}

/** A count ("Up to 800") or whether the plan includes the feature. */
export type PlanMatrixValue = string | boolean

export type PlanMatrixRow = {
  label: string
  /** One value per plan, in the same order as `plans`. */
  values: PlanMatrixValue[]
}

export type PlanMatrixGroup = {
  /** Omitted for the capacity rows above the first heading. */
  title?: string
  rows: PlanMatrixRow[]
}

export type CalculatorPlan = {
  /** Matches a name in `plans`; the price comes from that card. */
  name: string
  description: string
}

export type RecommendedPlan = CalculatorPlan & {
  /** Split from the card price, e.g. "Rs" and "14,999". */
  currency: string
  amount: string
}

export type CalculatorAddOn = {
  id: string
  label: string
  description: string
}

export type CalculatorSelection = {
  members: number
  locations: number
  addOns: string[]
}
