import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotesList } from "@/components/notes/NotesList";

export default async function NotesPage() {
    const notes = await prisma.note.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
            <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6">
                <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Your Notes</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {notes.length} total note{notes.length === 1 ? "" : "s"}
                        </p>
                    </div>

                    <Link href="/notes/new">
                        <Button size="lg">Create Note</Button>
                    </Link>
                </div>

                <NotesList notes={notes} />
            </div>
        </main>
    );
}
