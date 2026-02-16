import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NoteType } from "@/types/note"

interface Props {
    note: NoteType
}

export default function NoteCard({ note }: Props) {
    return (
        <Card className="panel overflow-hidden gap-0 py-0 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <CardContent className="space-y-4 p-5">
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold leading-tight">{note.title}</h2>
                    <p className="text-xs text-muted-foreground">
                        {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {note.content}
                </p>

                <div className="flex gap-2 pt-1">
                    <Link href={`/notes/${note.id}`}>
                        <Button size="sm" variant="secondary">Edit</Button>
                    </Link>
                    <Link href={`/notes/${note.id}/delete`}>
                        <Button size="sm" variant="destructive">
                            Delete
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
