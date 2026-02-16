"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DeletePage() {
    const params = useParams<{ id: string | string[] }>()
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)
    const id = Array.isArray(params.id) ? params.id[0] : params.id

    const handleDelete = async () => {
        setIsDeleting(true)

        try {
            if (!id) {
                router.replace("/notes?status=delete-error")
                return
            }

            const res = await fetch(`/api/notes/${id}`, {
                method: "DELETE",
            })

            if (!res.ok) {
                router.replace(`/notes/${id}/delete?status=delete-error`)
                return
            }

            router.push("/notes?status=deleted")
            router.refresh()
        } catch {
            if (id) {
                router.replace(`/notes/${id}/delete?status=delete-error`)
            } else {
                router.replace("/notes?status=delete-error")
            }
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <section className="mx-auto max-w-xl panel p-6 md:p-8">
            <h1 className="text-2xl font-semibold tracking-tight">Delete note</h1>
            <p className="mt-2 text-sm text-muted-foreground">
                This action cannot be undone. The note will be permanently removed.
            </p>
            <div className="mt-6 flex gap-3">
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Confirm Delete"}
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/notes">Cancel</Link>
                </Button>
            </div>
        </section>
    )
}
