"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { registerAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Typography from "@/components/ui/Typography"
import { IEye, IEyeOff } from "@/lib/icons"
import { ROUTES } from "@/lib/routes"
import { SITE } from "@/lib/site"
import {
  registerDefaultValues,
  registerSchema,
  type RegisterValues,
} from "@/lib/auth/validations"

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  })

  const onSubmit = (values: RegisterValues) => {
    startTransition(async () => {
      const result = await registerAction(values)

      if (result?.errors) {
        for (const [field, messages] of Object.entries(result.errors)) {
          form.setError(field as keyof RegisterValues, {
            message: messages[0],
          })
        }
        return
      }

      if (result?.message) {
        toast.info(result.message)
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Typography variant="h3" as="h1">
            Create an account
          </Typography>
        </CardTitle>
        <CardDescription>Join {SITE.name} today</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-name">Full name</FieldLabel>

                  <Input
                    {...field}
                    id="register-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-email">Email</FieldLabel>

                  <Input
                    {...field}
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-password">Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id="register-password"
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
                  <FieldLabel htmlFor="register-confirm">
                    Confirm password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id="register-confirm"
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

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating account…" : "Create account"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Typography variant="muted" as="p" className="text-sm">
          Already have an account?{" "}
          <Link
            href={ROUTES.auth.login}
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  )
}

export default RegisterForm
