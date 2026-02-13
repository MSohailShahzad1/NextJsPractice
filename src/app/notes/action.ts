"use server";

import prisma from "@/lib/prisma";
import { noteSchema } from "@/validations/note.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// CREATE NOTE
export async function createNote(formData: FormData) {
    let noteId = "";

    try {
        const validated = noteSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
        });

        const note = await prisma.note.create({
            data: validated,
        });

        noteId = note.id;
    } catch (error) {
        console.error("Create note failed:", error);
        redirect("/notes/new?status=create-error");
    }

    revalidatePath("/notes");
    redirect(`/notes/${noteId}?status=created`);
}

// Update Note
export async function updateNote(
    id: string,
    formData: FormData
) {
    try {
        const validated = noteSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
        });

        await prisma.note.update({
            where: { id },
            data: validated,
        });
    } catch (error) {
        console.error("Update note failed:", error);
        redirect(`/notes/${id}?status=update-error`);
    }

    revalidatePath("/notes");
    redirect(`/notes/${id}?status=updated`);
}

// Delete Note
export async function deleteNote(id: string) {
    try {
        await prisma.note.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Delete note failed:", error);
        redirect(`/notes/${id}?status=delete-error`);
    }

    revalidatePath("/notes");
    redirect("/notes?status=deleted");
}
