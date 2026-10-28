"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { loginAction } from "@/app/actions/auth"
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
  loginDefaultValues,
  loginSchema,
  type LoginValues,
} from "@/lib/auth/validations"

type LoginFormProps = {
  next?: string | null

  // This one to disable the button when the component is streaming
  disabled?: boolean
}

const LoginForm = ({ next, disabled = false }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  })

  const onSubmit = (values: LoginValues) => {
    startTransition(async () => {
      const result = await loginAction(values, next)

      if (result?.errors) {
        for (const [field, messages] of Object.entries(result.errors)) {
          form.setError(field as keyof LoginValues, {
            message: messages[0],
          })
        }
        return
      }

      if (result?.message) {
        toast.error(result.message)
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Typography variant="h3" as="h1">
            Welcome back
          </Typography>
        </CardTitle>
        <CardDescription>Sign in to your {SITE.name} account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>

                  <Input
                    {...field}
                    id="login-email"
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
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
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

            <Button
              type="submit"
              className="w-full"
              disabled={isPending || disabled}
            >
              {isPending ? "Signing in…" : "Sign in"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Typography variant="muted" as="p" className="text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.auth.register}
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            Register
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
