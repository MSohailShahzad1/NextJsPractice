import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { z } from "zod"

const registerSchema = z.object({
    email: z.email("Please provide a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password } = registerSchema.parse(body)
        const normalizedEmail = email.trim().toLowerCase()

        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        })

        if (existingUser) {
            return Response.json(
                { error: "An account with this email already exists" },
                { status: 409 }
            )
        }

        const hashed = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                email: normalizedEmail,
                password: hashed,
            },
        })

        return Response.json({ message: "User created" }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return Response.json(
                { error: error.issues[0]?.message ?? "Invalid input" },
                { status: 400 }
            )
        }

        return Response.json(
            { error: "Failed to register user" },
            { status: 500 }
        )
    }
}
