import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateNote } from "../action";
import { NoteForm } from "@/components/notes/NoteForm";
import { Button } from "@/components/ui/button";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function NoteDetailPage({ params }: Props) {
    const { id } = await params;

    const note = await prisma.note.findUnique({
        where: { id },
    });

    if (!note) return notFound();

    return (
        <main className="min-h-screen bg-linear-to-b from-sky-50 to-white">
            <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Edit Note</h1>
                    <Button variant="outline" asChild>
                        <Link href="/notes">Back</Link>
                    </Button>
                </div>

                <NoteForm
                    action={updateNote.bind(null, note.id)}
                    defaultValues={{
                        title: note.title,
                        content: note.content,
                    }}
                    submitLabel="Update Note"
                />
            </div>
        </main>
    );
}
