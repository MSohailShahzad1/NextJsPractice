import NoteForm from "@/components/notes/NoteForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewNotePage() {
    return (
        <section className="mx-auto max-w-3xl panel p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                    <h1 className="page-title">Create Note</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Capture a new thought, task, or reminder.</p>
                </div>
                <Button asChild variant="outline" size="sm">
                    <Link href="/notes">Back</Link>
                </Button>
            </div>
            <NoteForm />
        </section>
    )
}
