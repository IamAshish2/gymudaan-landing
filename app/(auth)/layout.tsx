// Auth shell: the same fixed white palette as onboarding, ignoring the app
// theme. Each page lays out its own header and body.
const AuthLayout = ({
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

export default AuthLayout
