import { Note } from "@/generated/prisma/client";

export type NoteType = Omit<Note, "createdAt"> & {
    createdAt: string;
};