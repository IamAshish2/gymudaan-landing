import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import NextTopLoader from "nextjs-toploader"

import "./globals.css"
import ThemeProvider from "@/components/shared/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

// Brand typeface from the Gym Udaan Figma (400/500/600 are the weights used).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: `${SITE.name}: ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
  },
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        "antialiased",
        poppins.className,
        "font-sans",
        poppins.variable
      )}
    >
      <body>
        <NextTopLoader
          color="var(--primary)"
          height={3}
          showSpinner={false}
          shadow={false}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-right" duration={5000} />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
