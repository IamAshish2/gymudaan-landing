import { z } from "zod"

export const loginSchema = z.object({
  email: z.email({ error: "Enter a valid email address" }),
  password: z.string().min(1, { error: "Enter your password" }),
})

export type LoginValues = z.infer<typeof loginSchema>

export const loginDefaultValues: LoginValues = {
  email: "",
  password: "",
}

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { error: "Enter your current password" }),
    newPassword: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>

export const changePasswordDefaultValues: ChangePasswordValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}
