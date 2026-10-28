"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { changePasswordAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { IEye, IEyeOff } from "@/lib/icons"
import {
  changePasswordDefaultValues,
  changePasswordSchema,
  type ChangePasswordValues,
} from "@/lib/auth/validations"

const SecurityForm = () => {
  const [isPending, startTransition] = useTransition()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: changePasswordDefaultValues,
  })

  const onSubmit = (values: ChangePasswordValues) => {
    startTransition(async () => {
      const result = await changePasswordAction(values)

      if (result?.errors) {
        for (const [field, messages] of Object.entries(result.errors)) {
          form.setError(field as keyof ChangePasswordValues, {
            message: messages[0],
          })
        }
        return
      }

      if (result?.message) {
        toast.success(result.message)
      }

      form.reset(changePasswordDefaultValues)
    })
  }

  const { isDirty } = form.formState

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Controller
                name="currentPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="currentPassword">
                      Current password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="currentPassword"
                        type={showCurrent ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="pr-10"
                        aria-invalid={fieldState.invalid}
                        disabled={isPending}
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowCurrent((v) => !v)}
                        aria-label={
                          showCurrent ? "Hide password" : "Show password"
                        }
                        tabIndex={-1}
                      >
                        {showCurrent ? (
                          <IEyeOff className="size-4" aria-hidden />
                        ) : (
                          <IEye className="size-4" aria-hidden />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="newPassword">New password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="newPassword"
                        type={showNew ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="pr-10"
                        aria-invalid={fieldState.invalid}
                        disabled={isPending}
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowNew((v) => !v)}
                        aria-label={showNew ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showNew ? (
                          <IEyeOff className="size-4" aria-hidden />
                        ) : (
                          <IEye className="size-4" aria-hidden />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm new password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="pr-10"
                        aria-invalid={fieldState.invalid}
                        disabled={isPending}
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirm((v) => !v)}
                        aria-label={
                          showConfirm ? "Hide password" : "Show password"
                        }
                        tabIndex={-1}
                      >
                        {showConfirm ? (
                          <IEyeOff className="size-4" aria-hidden />
                        ) : (
                          <IEye className="size-4" aria-hidden />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-2">
          <Button type="submit" disabled={!isDirty || isPending}>
            {isPending ? "Updating…" : "Update password"}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SecurityForm
