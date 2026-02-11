export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center gap-3 px-6 py-16 text-muted-foreground">
      <p className="text-sm font-semibold uppercase tracking-[0.2em]">Loading</p>
      <p className="text-base">Fetching the latest posts…</p>
    </div>
  )
}
