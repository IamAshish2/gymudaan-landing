import AuthShell from "@/components/layout/AuthShell"

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <AuthShell>{children}</AuthShell>
}

export default AuthLayout
