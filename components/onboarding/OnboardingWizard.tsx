"use client"

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

import { submitOnboardingAction } from "@/app/actions/onboarding"
import ArtPreloader from "@/components/onboarding/ArtPreloader"
import BusinessStep from "@/components/onboarding/BusinessStep"
import ChoiceStep from "@/components/onboarding/ChoiceStep"
import FinishStep from "@/components/onboarding/FinishStep"
import OnboardingHeader from "@/components/onboarding/OnboardingHeader"
import PaymentStep from "@/components/onboarding/PaymentStep"
import ReviewStep from "@/components/onboarding/ReviewStep"
import StepActions from "@/components/onboarding/StepActions"
import StepHeader from "@/components/onboarding/StepHeader"
import OnboardingSkeleton from "@/components/onboarding/skeletons/OnboardingSkeleton"
import {
  businessTypes,
  goals,
  memberRanges,
  onboardingPlans,
  optionsByStep,
  stepCopy,
  tools,
} from "@/lib/onboarding/content"
import {
  clearDraft,
  readDraft,
  writeDraftStep,
  writeDraftValues,
} from "@/lib/onboarding/draft"
import {
  onboardingDefaultValues,
  onboardingSchema,
  STEP_FIELDS,
  TOTAL_STEPS,
  type OnboardingValues,
} from "@/lib/onboarding/validations"
import { ROUTES } from "@/lib/routes"
import { cn } from "@/lib/utils"

const STEP = { business: 5, plan: 6, payment: 7 } as const

const COPY_BY_STEP = [
  stepCopy.businessType,
  stepCopy.members,
  stepCopy.goals,
  stepCopy.tools,
  stepCopy.business,
  stepCopy.plan,
  stepCopy.payment,
  stepCopy.review,
]

const WizardForm = () => {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [draft] = useState(readDraft)
  // A step can only be opened once it's been reached.
  const [furthestStep, setFurthestStep] = useState(draft.furthestStep)
  const [finished, setFinished] = useState<{
    values: OnboardingValues
    note?: string
  } | null>(null)
  const stepRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { ...onboardingDefaultValues, ...draft.values },
  })

  const requested = Number(searchParams.get("step"))
  const step =
    Number.isInteger(requested) && requested >= 1
      ? Math.min(requested, furthestStep)
      : 1

  // Derived during render so the browser's own back button slides correctly too.
  const [previousStep, setPreviousStep] = useState(step)
  const [direction, setDirection] = useState<"forward" | "back">("forward")

  if (step !== previousStep) {
    setPreviousStep(step)
    setDirection(step > previousStep ? "forward" : "back")
  }

  // Steps validate on Next, so clear a field's error as soon as it's changed.
  useEffect(
    () =>
      form.subscribe({
        formState: { values: true },
        callback: ({ name, values }) => {
          if (name) form.clearErrors(name as keyof OnboardingValues)
          writeDraftValues(values)
        },
      }),
    [form]
  )

  useEffect(() => writeDraftStep(furthestStep), [furthestStep])

  // Move focus with the step so keyboard and screen-reader users follow it.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    window.scrollTo({ top: 0 })
    stepRef.current?.focus({ preventScroll: true })
  }, [step])

  const goTo = (next: number) => {
    setFurthestStep((furthest) => Math.max(furthest, next))
    window.history.pushState(null, "", `${ROUTES.onboarding}?step=${next}`)
  }

  const submit = (values: OnboardingValues) => {
    startTransition(async () => {
      const result = await submitOnboardingAction(values)

      if (result.errors) {
        toast.error(result.message)
        return
      }

      clearDraft()
      setFinished({ values, note: result.message })
    })
  }

  const handleNext = async () => {
    const isValid = await form.trigger(STEP_FIELDS[step - 1], {
      shouldFocus: true,
    })

    if (!isValid) return

    if (step < TOTAL_STEPS) {
      goTo(step + 1)
      return
    }

    await form.handleSubmit(submit)()
  }

  if (finished) {
    return (
      <>
        <OnboardingHeader step={TOTAL_STEPS} isComplete />
        <FinishStep values={finished.values} note={finished.note} />
      </>
    )
  }

  const isReview = step === TOTAL_STEPS
  const nextStepOptions = optionsByStep[step]

  return (
    <FormProvider {...form}>
      <OnboardingHeader step={step} />
      {nextStepOptions && <ArtPreloader options={nextStepOptions} />}

      <form
        noValidate
        className="flex flex-1 flex-col justify-center px-onboarding-panel-x py-onboarding-panel-y"
        onSubmit={(event) => {
          event.preventDefault()
          void handleNext()
        }}
      >
        <div
          key={step}
          ref={stepRef}
          tabIndex={-1}
          className={cn(
            "outline-none",
            direction === "forward"
              ? "motion-safe:animate-step-forward"
              : "motion-safe:animate-step-back"
          )}
        >
          <StepHeader {...COPY_BY_STEP[step - 1]} />

          {step === 1 && (
            <ChoiceStep name="businessType" options={businessTypes} />
          )}
          {step === 2 && <ChoiceStep name="members" options={memberRanges} />}
          {step === 3 && <ChoiceStep name="goals" options={goals} multiple />}
          {step === 4 && <ChoiceStep name="tools" options={tools} multiple />}
          {step === STEP.plan && (
            <ChoiceStep name="plan" options={onboardingPlans} layout="plans" />
          )}
          {step === STEP.business && <BusinessStep />}
          {step === STEP.payment && <PaymentStep />}
          {isReview && (
            <ReviewStep
              onEditBusiness={() => goTo(STEP.business)}
              onEditPlan={() => goTo(STEP.plan)}
              onEditPayment={() => goTo(STEP.payment)}
            />
          )}

          <StepActions
            nextLabel={isReview ? "Finish" : "Next"}
            isPending={isPending}
            className={isReview ? "mt-onboarding-tight" : undefined}
            onBack={step > 1 ? () => goTo(step - 1) : undefined}
          />
        </div>
      </form>
    </FormProvider>
  )
}

const subscribeToNothing = () => () => {}

// The draft lives in sessionStorage, so the form renders on the client only.
const OnboardingWizard = () => {
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  )

  return isClient ? <WizardForm /> : <OnboardingSkeleton />
}

export default OnboardingWizard
