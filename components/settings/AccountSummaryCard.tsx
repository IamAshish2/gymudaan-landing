import RoleLabel from "@/components/settings/RoleLabel"
import DetailRow from "@/components/shared/DetailRow"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IMail, IShieldCheck, IUserRound } from "@/lib/icons"
import type { SessionUser } from "@/lib/auth/types"

type AccountSummaryCardProps = {
  user: SessionUser
}

// Read-only for now — add a profile form here once the API exposes a
// profile endpoint (see docs/API.md → Gaps).
const AccountSummaryCard = ({ user }: AccountSummaryCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Profile</CardTitle>
      <CardDescription>Contact support to change your email.</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-5">
      <DetailRow
        icon={<IMail className="size-4" />}
        label="Email"
        value={user.email}
      />
      <DetailRow
        icon={<IShieldCheck className="size-4" />}
        label="Role"
        value={<RoleLabel role={user.role} />}
      />
      <DetailRow
        icon={<IUserRound className="size-4" />}
        label="User ID"
        value={<span className="tabular-nums">{user.userId}</span>}
      />
    </CardContent>
  </Card>
)

export default AccountSummaryCard
