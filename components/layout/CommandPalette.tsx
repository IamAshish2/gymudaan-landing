"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
import { ISearch } from "@/lib/icons"
import {
  accountNavItems,
  NAV_BY_SURFACE,
  type DashboardSurface,
} from "@/lib/nav"

type CommandPaletteProps = {
  surface: DashboardSurface
}

// ⌘K / Ctrl+K navigation across the surface's sidebar + the account pages.
const CommandPalette = ({ surface }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const sections = [
    ...NAV_BY_SURFACE[surface].sections,
    { label: "Account", items: accountNavItems },
  ]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const runCommand = (href: string) => {
    setOpen(false)
    setTimeout(() => router.push(href), 0)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-sm items-center gap-2 rounded-4xl border border-input bg-input/30 px-3 text-sm text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <ISearch className="size-4 shrink-0" />
        <span className="flex-1 truncate text-left">Search...</span>
        <Kbd>⌘K</Kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Jump to any page in the dashboard."
        className="sm:max-w-lg"
      >
        <Command>
          <CommandInput placeholder="Search navigation..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {sections.map((section, idx) => (
              <CommandGroup
                key={section.label ?? `section-${idx}`}
                heading={section.label}
              >
                {section.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={item.title}
                    disabled={item.comingSoon}
                    onSelect={() => {
                      if (item.comingSoon) return
                      runCommand(item.href)
                    }}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                    {item.comingSoon && (
                      <CommandShortcut>
                        <Badge
                          variant="secondary"
                          className="h-4 px-1.5 text-xs font-medium tracking-wide uppercase"
                        >
                          Soon
                        </Badge>
                      </CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

export default CommandPalette
