"use client"

import { useEffect, useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { saveUserAction } from "@/app/actions/users"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IEye, IEyeOff } from "@/lib/icons"
import { ROLE_STRING_LABEL, type Role } from "@/lib/roles/types"
import {
  userDefaultValues,
  userSchemaFor,
  type UserFormValues,
} from "@/lib/users/validations"

type UserDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  roles: Role[]
  /** Omit to create a new user; pass an existing user to edit it. */
  user?: {
    id: number
    email: string
    role: { id: number }
  }
}

const UserDialog = ({ open, onOpenChange, roles, user }: UserDialogProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const isEdit = user !== undefined

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchemaFor(isEdit)),
    defaultValues: userDefaultValues,
  })

  // Every close path goes through here so the next open starts with the
  // password hidden.
  const handleOpenChange = (next: boolean) => {
    if (!next) setShowPassword(false)
    onOpenChange(next)
  }

  // Re-seed for whichever user (or blank create) the shared dialog opens for.
  useEffect(() => {
    if (!open) return

    form.reset(
      user
        ? { email: user.email, password: "", roleId: user.role.id }
        : userDefaultValues
    )
  }, [open, user, form])

  const onSubmit = (values: UserFormValues) => {
    startTransition(async () => {
      const result = await saveUserAction(values, user?.id)

      if (result?.errors) {
        for (const [field, messages] of Object.entries(result.errors)) {
          form.setError(field as keyof UserFormValues, {
            message: messages[0],
          })
        }
        return
      }

      if (result?.message) {
        toast.success(result.message)
      }

      handleOpenChange(false)
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit user" : "Create user"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update this user's email, role, or password."
              : "Add a platform user and assign their role."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="user-email"
                    type="email"
                    autoComplete="off"
                    placeholder="name@example.com"
                    aria-invalid={fieldState.invalid}
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="roleId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-role">Role</FieldLabel>
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                    disabled={isPending}
                  >
                    <SelectTrigger
                      id="user-role"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={String(role.id)}>
                          {ROLE_STRING_LABEL[role.role] ?? role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="user-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      className="pr-10"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <IEyeOff className="size-4" aria-hidden />
                      ) : (
                        <IEye className="size-4" aria-hidden />
                      )}
                    </button>
                  </div>
                  {isEdit && (
                    <FieldDescription>
                      Leave blank to keep the current password.
                    </FieldDescription>
                  )}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? isEdit
                  ? "Saving…"
                  : "Creating…"
                : isEdit
                  ? "Save changes"
                  : "Create user"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UserDialog
