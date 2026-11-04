import { IS_INDEXABLE } from "@/lib/seo/indexing"

// Marketing content that needs the business's sign-off (testimonials, figures)
// carries an `approved` flag. Production builds publish only approved items;
// staging, preview and development builds show everything so it can still be
// reviewed in context. Approving an item is flipping its flag: nothing is
// deleted. See docs/seo/03 §11 (launch gates).

export type Approval = {
  /** Confirmed true and approved for publication by the business. */
  approved: boolean
}

export const isPublishable = (approved: boolean) => approved || !IS_INDEXABLE

export const publishable = <T extends Approval>(items: readonly T[]): T[] =>
  items.filter((item) => isPublishable(item.approved))
