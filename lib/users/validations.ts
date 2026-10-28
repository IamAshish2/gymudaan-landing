import { z } from "zod"

const emailField = z.email({ error: "Enter a valid email address" })
const roleIdField = z
  .number({ error: "Select a role" })
  .int()
  .positive({ error: "Select a role" })

// Create requires a password; update leaves it optional (blank = keep current).
export const userCreateSchema = z.object({
  email: emailField,
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" }),
  roleId: roleIdField,
})

export const userUpdateSchema = z.object({
  email: emailField,
  password: z.union([
    z.string().min(8, { error: "Password must be at least 8 characters" }),
    z.literal(""),
  ]),
  roleId: roleIdField,
})

export type UserCreateValues = z.infer<typeof userCreateSchema>
export type UserUpdateValues = z.infer<typeof userUpdateSchema>

// The form always carries a password field (optional on edit) — use the union type.
export type UserFormValues = UserUpdateValues

// The dialog is one shared instance for create + edit; pick the right resolver.
export const userSchemaFor = (isEdit: boolean) =>
  isEdit ? userUpdateSchema : userCreateSchema

export const userDefaultValues: UserFormValues = {
  email: "",
  password: "",
  roleId: 0,
}
