import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-100 via-slate-50 to-amber-100">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center px-4 py-12 sm:px-6">
        <div className="w-full rounded-3xl border bg-card/90 p-8 shadow-lg backdrop-blur sm:p-12">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Notes Workspace
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Organize ideas with a clean, fast note flow.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Create, edit, and manage your notes with simple server actions and
            a focused interface.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/notes">Open Notes</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/notes/new">Create First Note</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
