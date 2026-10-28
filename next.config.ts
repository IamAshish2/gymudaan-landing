import type { NextConfig } from "next"

// Media served by the backend (uploads from the rich text editor etc.). Derived
// from API_BASE_URL so pointing the app at a new backend needs no config edit.
const apiOrigin = (() => {
  try {
    return process.env.API_BASE_URL ? new URL(process.env.API_BASE_URL) : null
  } catch {
    return null
  }
})()

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: apiOrigin
      ? [
          {
            protocol: apiOrigin.protocol.replace(":", "") as "http" | "https",
            hostname: apiOrigin.hostname,
            pathname: "/uploads/**",
          },
        ]
      : [],
  },
}

export default nextConfig
