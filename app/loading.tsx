import { Spinner } from "@/components/ui/spinner"

const GlobalLoader = () => {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Spinner className="size-8 text-primary" />
    </div>
  )
}

export default GlobalLoader
