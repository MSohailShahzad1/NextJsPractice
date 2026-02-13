"use client";

import { deleteNote } from "@/app/notes/action";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useFormStatus } from "react-dom";

export function DeleteButton({ id }: { id: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                    Delete Note
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete this note?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter showCloseButton>
                    <form action={deleteNote.bind(null, id)}>
                        <DeleteConfirmButton />
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function DeleteConfirmButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" variant="destructive" disabled={pending}>
            {pending ? "Deleting..." : "Confirm Delete"}
        </Button>
    );
}
