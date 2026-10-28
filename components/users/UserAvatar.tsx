import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const initials = (email: string): string => {
  const local = email.trim().split("@")[0] ?? ""
  const parts = local.split(/[._-]+/).filter(Boolean)

  if (parts.length === 0) return "?"

  const first = parts[0]!.charAt(0)
  const last = parts.length > 1 ? parts[parts.length - 1]!.charAt(0) : ""

  return (first + last).toUpperCase() || "?"
}

type UserAvatarProps = {
  email: string
  className?: string
}

const UserAvatar = ({ email, className }: UserAvatarProps) => (
  <Avatar className={className}>
    <AvatarFallback>{initials(email)}</AvatarFallback>
  </Avatar>
)

export default UserAvatar
