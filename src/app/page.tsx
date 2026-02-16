import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@/auth"

export default async function HomePage() {
  const session = await auth()

  return (
    <section className="panel overflow-hidden">
      <div className="grid gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr] md:px-10 md:py-14">
        <div className="space-y-5">
          <p className="inline-flex items-center rounded-full bg-accent/60 px-3 py-1 text-xs font-medium text-accent-foreground">
            Organized and searchable
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Keep your ideas sharp with a focused notes workspace.
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">
            Create, edit, search, and manage notes in one place with instant feedback and a clean writing experience.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={session?.user ? "/notes" : "/login"}>
                {session?.user ? "Open Notes" : "Get Started"}
              </Link>
            </Button>
            {!session?.user ? (
              <Button asChild variant="outline">
                <Link href="/register">Create Account</Link>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-muted/50 p-5">
          <h2 className="mb-4 text-sm font-semibold">What you can do</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="rounded-lg bg-background/80 p-3">Capture notes quickly with autosized form controls.</li>
            <li className="rounded-lg bg-background/80 p-3">Use debounced search and sorting to find content fast.</li>
            <li className="rounded-lg bg-background/80 p-3">Track every action with status toasts and loading states.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
