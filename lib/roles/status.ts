// Tint SSOT for RoleBadge — admin-tier roles get the brand tint, everything
// else a neutral one. Tints come from the shared STATUS_TINT SSOT.
import { STATUS_TINT } from "@/lib/status-tint"

export const ROLE_BADGE_STYLES: Record<string, string> = {
  ROLE_SUPER_ADMIN: STATUS_TINT.brand,
  ROLE_ADMIN: STATUS_TINT.brand,
  ROLE_SELLER: STATUS_TINT.info,
  ROLE_USER: STATUS_TINT.neutral,
  ROLE_CUSTOMER: STATUS_TINT.neutral,
}
