"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "@teispace/next-themes"

import { INTERACTIVE_TRANSITION } from "@/components/shared/SectionLayout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { LucideIcon } from "@/lib/icons"
import { IMonitor, IMoon, ISun } from "@/lib/icons"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

type ThemeOption = {
  value: string
  label: string
  icon: LucideIcon
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: "light", label: "Light", icon: ISun },
  { value: "dark", label: "Dark", icon: IMoon },
  { value: "system", label: "System", icon: IMonitor },
]

const subscribeNoop = () => () => {}

// Compares `theme` (not `resolvedTheme`) so "System" is its own selectable
// state. Mounted guard is the usual next-themes tradeoff — no ring until
// hydration, but no mismatch warnings either.
const AppearanceCard = () => {
  const { theme, setTheme } = useTheme()
  // false on the server + during hydration, true after — without an effect.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Choose how {SITE.name} looks. System follows your device.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          role="radiogroup"
          aria-label="Theme"
          className="grid grid-cols-3 gap-3 sm:max-w-md"
        >
          {THEME_OPTIONS.map((option) => {
            const selected = mounted && theme === option.value

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setTheme(option.value)}
                className={cn(
                  INTERACTIVE_TRANSITION,
                  "flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium",
                  selected
                    ? "border-primary text-foreground ring-1 ring-primary"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <option.icon className="size-5" />
                {option.label}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default AppearanceCard
