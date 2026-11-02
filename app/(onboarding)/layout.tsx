// Onboarding shell: a full white page on a fixed palette that ignores the app
// theme, like the marketing surface. Each view lays out its own header and body.
const OnboardingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="flex min-h-svh w-full flex-col overflow-x-clip bg-surface-light text-ink">
      {children}
    </main>
  )
}

export default OnboardingLayout
