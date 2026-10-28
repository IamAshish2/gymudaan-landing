"use client"

import { useTheme } from "@teispace/next-themes"

import { Button } from "@/components/ui/button"
import { INTERACTIVE_TRANSITION } from "@/components/shared/SectionLayout"
import { IMoon, ISun } from "@/lib/icons"
import { cn } from "@/lib/utils"

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon-sm"
      className="relative text-muted-foreground hover:text-foreground"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <ISun
        className={cn(
          INTERACTIVE_TRANSITION,
          "scale-100 rotate-0 dark:scale-0 dark:-rotate-90"
        )}
      />
      <IMoon
        className={cn(
          INTERACTIVE_TRANSITION,
          "absolute scale-0 rotate-90 dark:scale-100 dark:rotate-0"
        )}
      />
    </Button>
  )
}

export default ThemeToggle
