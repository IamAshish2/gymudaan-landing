// Formatting helpers live here (not in client components) so server components
// can call them too — "use client" modules' exports can't run on the server.

const currencyFormatters = new Map<string, Intl.NumberFormat>()

/** Currency-formatted amount, e.g. `formatCurrency(1500, "USD")` → `$1,500`. */
export const formatCurrency = (amount: number, currency = "USD"): string => {
  let formatter = currencyFormatters.get(currency)

  if (!formatter) {
    formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    })
    currencyFormatters.set(currency, formatter)
  }

  return formatter.format(amount)
}

/** ISO day string (`2026-08-05`) → Date, or undefined when unparseable. */
export const parseDateValue = (value: string): Date | undefined => {
  if (!value) return undefined

  const [year, month, day] = value.split("-").map(Number)
  if (!year || !month || !day) return undefined

  return new Date(year, month - 1, day)
}

/** Date → ISO day string (`2026-08-05`), the form the API expects. */
export const formatDateValue = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

/** ISO day string → readable label, e.g. `Aug 5, 2026`. */
export const formatDateLabel = (value: string): string | null => {
  const date = parseDateValue(value)
  if (!date) return null

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
