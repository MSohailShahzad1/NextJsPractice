"use client"

import { useCallback, useEffect, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type SortOption = "newest" | "oldest" | "title-asc" | "title-desc"

interface Props {
    initialQuery: string
    initialSort: SortOption
    currentPage: number
    totalPages: number
}

export default function NotesControls({
    initialQuery,
    initialSort,
    currentPage,
    totalPages,
}: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [query, setQuery] = useState(initialQuery)
    const [sort, setSort] = useState<SortOption>(initialSort)

    useEffect(() => {
        setQuery(initialQuery)
    }, [initialQuery])

    useEffect(() => {
        setSort(initialSort)
    }, [initialSort])

    const replaceWithParams = useCallback(
        (updates: { q?: string; sort?: SortOption; page?: number }) => {
            const nextParams = new URLSearchParams(searchParams.toString())

            if (updates.q !== undefined) {
                const q = updates.q.trim()
                if (q) {
                    nextParams.set("q", q)
                } else {
                    nextParams.delete("q")
                }
            }

            if (updates.sort !== undefined) {
                if (updates.sort === "newest") {
                    nextParams.delete("sort")
                } else {
                    nextParams.set("sort", updates.sort)
                }
            }

            if (updates.page !== undefined) {
                if (updates.page <= 1) {
                    nextParams.delete("page")
                } else {
                    nextParams.set("page", String(updates.page))
                }
            }

            const nextUrl = nextParams.toString()
                ? `${pathname}?${nextParams.toString()}`
                : pathname

            startTransition(() => {
                router.replace(nextUrl, { scroll: false })
            })
        },
        [pathname, router, searchParams]
    )

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim() === initialQuery) {
                return
            }

            replaceWithParams({ q: query, page: 1 })
        }, 4000)

        return () => clearTimeout(timeoutId)
    }, [initialQuery, query, replaceWithParams])

    const goToPage = (nextPage: number) => {
        replaceWithParams({ page: nextPage })
    }

    return (
        <div className="space-y-3">
            <div className="flex flex-col gap-3 md:flex-row">
                <Input
                    placeholder="Search notes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="md:max-w-sm"
                />

                <select
                    value={sort}
                    onChange={(e) => {
                        const nextSort = e.target.value as SortOption
                        setSort(nextSort)
                        replaceWithParams({
                            sort: nextSort,
                            page: 1,
                        })
                    }}
                    className="h-9 rounded-md border bg-transparent px-3 text-sm outline-none"
                    aria-label="Sort notes"
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="title-asc">Title A-Z</option>
                    <option value="title-desc">Title Z-A</option>
                </select>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </p>

                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage <= 1 || isPending}
                    >
                        Previous
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage >= totalPages || isPending}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {isPending ? (
                <p className="text-sm text-muted-foreground">Updating notes...</p>
            ) : null}
        </div>
    )
}
