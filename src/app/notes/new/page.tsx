import Link from "next/link";
import { createNote } from "../action";
import { NoteForm } from "@/components/notes/NoteForm";
import { Button } from "@/components/ui/button";

export default function NewNotePage() {
    return (
        <main className="min-h-screen bg-linear-to-b from-amber-50 to-white">
            <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Create Note</h1>
                    <Button variant="outline" asChild>
                        <Link href="/notes">Back</Link>
                    </Button>
                </div>

                <NoteForm
                    action={createNote}
                    submitLabel="Save Note"
                />
            </div>
        </main>
    );
}
