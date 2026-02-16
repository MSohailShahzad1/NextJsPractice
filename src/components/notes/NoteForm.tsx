"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePathname, useRouter } from "next/navigation"

interface Props {
    initialData?: {
        id?: string
        title: string
        content: string
    }
}

export default function NoteForm({ initialData }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const [title, setTitle] = useState(initialData?.title || "")
    const [content, setContent] = useState(initialData?.content || "")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isEdit = Boolean(initialData?.id)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const endpoint = isEdit
            ? `/api/notes/${initialData?.id}`
            : "/api/notes"

        const method = isEdit ? "PUT" : "POST"

        try {
            const payload = {
                title: title.trim(),
                content: content.trim(),
            }

            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                router.replace(`${pathname}?status=${isEdit ? "update-error" : "create-error"}`)
                return
            }

            router.push(`/notes?status=${isEdit ? "updated" : "created"}`)
            router.refresh()
        } catch {
            router.replace(`${pathname}?status=${isEdit ? "update-error" : "create-error"}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input
                    id="title"
                    placeholder="Add a short title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">Content</label>
                <Textarea
                    id="content"
                    placeholder="Write your note content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-40"
                    required
                />
            </div>

            <Button type="submit" disabled={isSubmitting} className="min-w-32">
                {isSubmitting
                    ? (isEdit ? "Updating..." : "Creating...")
                    : (isEdit ? "Update Note" : "Create Note")}
            </Button>
        </form>
    )
}
