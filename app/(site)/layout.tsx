import SiteShell from "@/components/layout/SiteShell"

const SiteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <SiteShell>{children}</SiteShell>
}

export default SiteLayout
