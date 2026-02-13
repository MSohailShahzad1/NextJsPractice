import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { NoteType } from "@/types/note";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./DeleteButton";

interface NotesListProps {
    notes: NoteType[];
}

export function NotesList({ notes }: NotesListProps) {
    if (!notes.length) {
        return (
            <div className="rounded-xl border border-dashed bg-card/70 p-10 text-center">
                <p className="text-lg font-semibold">No notes yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                    Create your first note to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {notes.map((note) => (
                <Card key={note.id} className="py-0">
                    <CardContent className="p-5">
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                                <h3 className="mt-1 text-lg font-semibold line-clamp-1">
                                    {note.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                                    {note.content}
                                </p>
                            </div>
                            <div className="flex justify-around">
                                <Link href={`/notes/${note.id}`}>
                                    <Button variant="outline" className="w-full">
                                        Open Note
                                    </Button>
                                </Link>
                                <DeleteButton id={note.id} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
