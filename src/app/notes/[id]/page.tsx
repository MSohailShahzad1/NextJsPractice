import NoteForm from "@/components/notes/NoteForm"
import prisma from "@/lib/prisma"
import { NoteType } from "@/types/note"
import { notFound, redirect } from "next/navigation"
import { auth } from '@/auth'
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function getNote(id: string, userId: string): Promise<NoteType | null> {
    const note = await prisma.note.findFirst({
        where: { id, userId },
    })

    if (!note) {
        return null
    }

    return {
        ...note,
        createdAt: note.createdAt.toISOString(),
    }
}

export default async function EditNotePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const session = await auth()

    if (!session?.user?.id) {
        redirect("/login")
    }

    const { id } = await params
    const note = await getNote(id, session.user.id)

    if (!note) {
        notFound()
    }

    return (
        <section className="mx-auto max-w-3xl panel p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                    <h1 className="page-title">Edit Note</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Update details and keep your notes current.</p>
                </div>
                <Button asChild variant="outline" size="sm">
                    <Link href="/notes">Back</Link>
                </Button>
            </div>
            <NoteForm initialData={{ id: note.id, title: note.title, content: note.content }} />
        </section>
    )
}
