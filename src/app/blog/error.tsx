"use client"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-start justify-center gap-3 px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Blog Error
      </p>
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
