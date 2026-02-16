import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
        }
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password)
                    throw new Error("Missing credentials")

                const normalizedEmail = String(credentials.email).trim().toLowerCase()
                const user = await prisma.user.findUnique({
                    where: { email: normalizedEmail },
                })

                if (!user) throw new Error("User not found")

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )

                if (!isValid) throw new Error("Invalid password")

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            },
        }),
    ],

    session: { strategy: "jwt" },

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id
            return token
        },
        async session({ session, token }) {
            if (token && session.user) session.user.id = token.id as string
            return session
        },
    },

    pages: {
        signIn: "/login",
    },
})
