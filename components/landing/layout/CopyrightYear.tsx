import { cacheLife } from "next/cache"

// Reading the clock during prerender needs an explicit cache under
// cacheComponents; a daily lifetime keeps the footer static.
const CopyrightYear = async () => {
  "use cache"
  cacheLife("days")

  return <>{new Date().getFullYear()}</>
}

export default CopyrightYear
