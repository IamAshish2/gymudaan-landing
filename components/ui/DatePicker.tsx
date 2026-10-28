"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDateLabel, formatDateValue, parseDateValue } from "@/lib/format"
import { ICalendar } from "@/lib/icons"
import { cn } from "@/lib/utils"

const startOfToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

type DatePickerProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  "aria-invalid"?: boolean
  triggerClassName?: string
  disablePast?: boolean
  /** Blocks dates after today — e.g. a date of birth can't be in the future. */
  disableFuture?: boolean
}

const DatePicker = ({
  id,
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  "aria-invalid": ariaInvalid,
  triggerClassName,
  disablePast = true,
  disableFuture = false,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false)
  const selectedDate = parseDateValue(value)
  const label = formatDateLabel(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          id={id}
          variant="outline"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          aria-expanded={open}
          aria-haspopup="dialog"
          className={cn(
            "w-full justify-between font-normal",
            !label && "text-muted-foreground",
            triggerClassName
          )}
        >
          <span className="truncate">{label ?? placeholder}</span>
          <ICalendar className="size-4 shrink-0 opacity-50" aria-hidden />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={selectedDate}
          defaultMonth={selectedDate ?? startOfToday()}
          onSelect={(date) => {
            if (!date) return
            onChange(formatDateValue(date))
            setOpen(false)
          }}
          disabled={(date) => {
            if (disablePast && date < startOfToday()) return true
            if (disableFuture && date > startOfToday()) return true
            return false
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
