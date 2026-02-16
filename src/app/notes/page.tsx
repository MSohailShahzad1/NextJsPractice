import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import Link from "next/link"
import NoteCard from "@/components/notes/NoteCard"
import { redirect } from "next/navigation"
import NotesControls from "@/components/notes/NotesControls"
import { Button } from "@/components/ui/button"

type SortOption = "newest" | "oldest" | "title-asc" | "title-desc"

const PAGE_SIZE = 4
const VALID_SORTS: SortOption[] = ["newest", "oldest", "title-asc", "title-desc"]

export default async function NotesPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; sort?: string; page?: string }>
}) {
    const session = await auth()

    if (!session?.user?.id)
        redirect("/login")

    const params = await searchParams
    const query = (params.q ?? "").trim()
    const sort = VALID_SORTS.includes((params.sort ?? "") as SortOption)
        ? (params.sort as SortOption)
        : "newest"
    const requestedPage = Number.parseInt(params.page ?? "1", 10)

    const where = {
        userId: session.user.id,
        ...(query
            ? {
                OR: [
                    { title: { contains: query, mode: "insensitive" as const } },
                    { content: { contains: query, mode: "insensitive" as const } },
                ],
            }
            : {}),
    }

    const totalCount = await prisma.note.count({ where })
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
    const currentPage = Number.isNaN(requestedPage)
        ? 1
        : Math.min(Math.max(requestedPage, 1), totalPages)

    const orderBy =
        sort === "oldest"
            ? { createdAt: "asc" as const }
            : sort === "title-asc"
                ? { title: "asc" as const }
                : sort === "title-desc"
                    ? { title: "desc" as const }
                    : { createdAt: "desc" as const }

    const notes = await prisma.note.findMany({
        where,
        orderBy,
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
    })

    return (
        <section className="space-y-5">
            <div className="panel flex flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-6">
                <div>
                    <h1 className="page-title">Your Notes</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Search, sort, and manage your note collection.</p>
                </div>
                <Button asChild>
                    <Link href="/notes/new">Create Note</Link>
                </Button>
            </div>

            <div className="panel p-4 md:p-5">
                <NotesControls
                    initialQuery={query}
                    initialSort={sort}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={{
                                ...note,
                                createdAt: note.createdAt.toISOString(),
                            }}
                        />
                    ))
                ) : (
                    <div className="panel col-span-full p-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            No notes found for the current filters.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
