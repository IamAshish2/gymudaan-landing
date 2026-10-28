import { z } from "zod"

// Zod v4 replacement for the deprecated `.flatten().fieldErrors`.
// Produces the same `{ field: string[] }` shape from `z.treeifyError`.
export const toFieldErrors = <T extends Record<string, unknown>>(
  error: z.ZodError<T>
): Partial<Record<keyof T, string[]>> => {
  const tree = z.treeifyError(error)
  const fieldErrors: Partial<Record<keyof T, string[]>> = {}

  for (const [key, value] of Object.entries(tree.properties ?? {})) {
    if (value?.errors?.length) {
      fieldErrors[key as keyof T] = value.errors
    }
  }

  return fieldErrors
}
