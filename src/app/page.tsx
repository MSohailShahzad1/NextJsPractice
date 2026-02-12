import { ContactForm } from "@/components/contact/ContactForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-primary),transparent_60%)]/[20] blur-2xl" />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <section className="space-y-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              Fast replies • Human support
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Contact our team
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                Share what you’re building and we’ll help you pick the right path.
                Expect a response within one business day.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Coverage
                </p>
                <p className="mt-2 text-lg font-semibold">North America</p>
                <p className="text-sm text-muted-foreground">
                  9am–6pm ET weekdays
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Typical response
                </p>
                <p className="mt-2 text-lg font-semibold">Under 24 hours</p>
                <p className="text-sm text-muted-foreground">
                  Priority for active clients
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/messages">Show Messages</Link>
              </Button>
            </div>
          </section>
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
