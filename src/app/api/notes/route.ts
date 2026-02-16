import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { noteSchema } from "@/validations/note.schema";
import { NoteType } from "@/types/note";
import { z } from "zod";
import { auth } from '@/auth';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const notes = await prisma.note.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });

        const formattedNotes: NoteType[] = notes.map(note => ({
            ...note,
            createdAt: note.createdAt.toISOString(),
        }));

        return NextResponse.json(formattedNotes);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch notes" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validated = noteSchema.parse(body);

        const note = await prisma.note.create({
            data: {
                ...validated,
                userId: session.user.id,
            },
        });

        const formatted: NoteType = {
            ...note,
            createdAt: note.createdAt.toISOString(),
        };

        return NextResponse.json(formatted, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0]?.message ?? "Invalid input" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create note" },
            { status: 500 }
        );
    }
}
