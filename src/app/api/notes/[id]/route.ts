import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { noteSchema } from "@/validations/note.schema";
import { z } from "zod";
import { auth } from "@/auth";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const note = await prisma.note.findFirst({
            where: { id, userId: session.user.id },
        });

        if (!note) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            ...note,
            createdAt: note.createdAt.toISOString(),
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch note" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const validated = noteSchema.parse(body);

        const updatedResult = await prisma.note.updateMany({
            where: { id, userId: session.user.id },
            data: validated,
        });

        if (updatedResult.count === 0) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        const updated = await prisma.note.findFirst({
            where: { id, userId: session.user.id },
        });

        if (!updated) {
            return NextResponse.json(
                { error: "Failed to update note" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            ...updated,
            createdAt: updated.createdAt.toISOString(),
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0]?.message ?? "Invalid input" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to update note" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const deleted = await prisma.note.deleteMany({
            where: { id, userId: session.user.id },
        });

        if (deleted.count === 0) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Deleted" });
    } catch {
        return NextResponse.json(
            { error: "Failed to delete note" },
            { status: 500 }
        );
    }
}
