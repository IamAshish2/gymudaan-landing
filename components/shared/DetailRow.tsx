import type { ReactNode } from "react"

import Typography from "@/components/ui/Typography"

type DetailRowProps = {
  icon: ReactNode
  label: string
  value: ReactNode
}

const DetailRow = ({ icon, label, value }: DetailRowProps) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 text-muted-foreground">{icon}</div>

    <div className="flex flex-col gap-1">
      <Typography variant="small" className="text-muted-foreground">
        {label}
      </Typography>
      <div className="text-sm">{value}</div>
    </div>
  </div>
)

export default DetailRow
