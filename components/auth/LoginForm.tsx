"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { googleSignInAction, loginAction } from "@/app/actions/auth"
import GoogleGlyph from "@/components/auth/GoogleGlyph"
import LandingButton from "@/components/landing/primitives/LandingButton"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { IEye, IEyeOff } from "@/lib/icons"
import {
  loginDefaultValues,
  loginSchema,
  type LoginValues,
} from "@/lib/auth/validations"
import { cn } from "@/lib/utils"

// Same filled field as the onboarding form (components/onboarding/TextField).
const INPUT_CLASS =
  "h-11.25 rounded-field border-transparent bg-surface-tile px-5 text-badge text-ink transition-[background-color,border-color,box-shadow] duration-300 ease-standard placeholder:text-ink-muted focus-visible:border-brand/50 focus-visible:bg-surface-light focus-visible:ring-brand-tint md:text-badge"

const ERROR_CLASS =
  "text-status-alert motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1"

const BUTTON_CLASS =
  "h-12.5 w-full text-body transition-[color,background-color,border-color,box-shadow,translate,scale] focus-visible:ring-offset-surface-light motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98]"

const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [isGooglePending, startGoogleTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  })

  const isBusy = isPending || isGooglePending

  const onSubmit = (values: LoginValues) => {
    startTransition(async () => {
      // On success the action redirects, so a result means it didn't sign in.
      const result = await loginAction(values)

      if (result?.errors) {
        for (const [field, messages] of Object.entries(result.errors)) {
          form.setError(field as keyof LoginValues, { message: messages[0] })
        }
        return
      }

      if (result?.message) {
        toast.error(result.message)
      }
    })
  }

  const onGoogle = () => {
    startGoogleTransition(async () => {
      const result = await googleSignInAction()

      if (result?.message) {
        toast.info(result.message)
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <LandingButton
        type="button"
        variant="light"
        onClick={onGoogle}
        disabled={isBusy}
        className={cn(
          BUTTON_CLASS,
          "border border-line-option font-normal hover:border-ink-muted hover:bg-surface-tile"
        )}
      >
        {isGooglePending ? (
          <Spinner className="size-5" />
        ) : (
          <GoogleGlyph className="size-5" />
        )}
        Continue with Google
      </LandingButton>

      <FieldSeparator className="*:data-[slot=separator]:bg-line-light [&>span]:text-badge [&>span]:text-ink-muted">
        or
      </FieldSeparator>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-5">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-email" className="text-body">
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="login-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@yourgym.com"
                  aria-invalid={fieldState.invalid}
                  disabled={isBusy}
                  className={INPUT_CLASS}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className={ERROR_CLASS}
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-password" className="text-body">
                  Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    disabled={isBusy}
                    className={cn(INPUT_CLASS, "pr-12")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-chip text-ink-muted outline-none hover:text-ink focus-visible:ring-[3px] focus-visible:ring-brand/60"
                  >
                    {showPassword ? (
                      <IEyeOff className="size-4" aria-hidden />
                    ) : (
                      <IEye className="size-4" aria-hidden />
                    )}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className={ERROR_CLASS}
                  />
                )}
              </Field>
            )}
          />

          <LandingButton
            type="submit"
            disabled={isBusy}
            className={cn(BUTTON_CLASS, "mt-2")}
          >
            {isPending && <Spinner className="size-5" />}
            {isPending ? "Logging in…" : "Log in"}
          </LandingButton>
        </FieldGroup>
      </form>
    </div>
  )
}

export default LoginForm
