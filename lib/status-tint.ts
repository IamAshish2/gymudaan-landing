// Shared status tints — the SSOT every status badge in every module maps onto,
// so the same meaning always reads the same colour (a CANCELLED booking and a
// REJECTED adventure are both `danger`, an ACTIVE type and a CONFIRMED booking
// are both `success`). Never inline these strings in a component or a domain
// status map; add a tint here if a genuinely new meaning appears.
export const STATUS_TINT = {
  /** Not started / inert: DRAFT, unset. */
  neutral: "border-zinc-500/20 bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
  /** Closed out and inert, heavier than neutral: ARCHIVED. */
  neutralStrong:
    "border-zinc-500/30 bg-zinc-500/20 text-zinc-700 dark:text-zinc-300",
  /** Waiting on someone: PENDING, PENDING_REVIEW. */
  warning:
    "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  /** A bad outcome that already happened, distinct from a cancellation: NO_SHOW. */
  warningStrong:
    "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  /** Good and live: APPROVED, PUBLISHED, CONFIRMED, ACTIVE. */
  success:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400",
  /** Finished successfully — brand teal, so it reads apart from live-and-ongoing green: COMPLETED. */
  brand: "border-primary/20 bg-primary/10 text-primary",
  /** Categorical, not a judgement: role tiers. */
  info: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400",
  /** Refused or called off: REJECTED, CANCELLED. */
  danger: "border-destructive/20 bg-destructive/10 text-destructive",
  /** Refused and blocking, heavier than danger: SUSPENDED. */
  dangerStrong:
    "border-destructive/30 bg-destructive/20 text-destructive dark:bg-destructive/30",
} as const
