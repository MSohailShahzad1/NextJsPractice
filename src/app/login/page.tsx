"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const normalizedEmail = email.trim().toLowerCase()
            const result = await signIn("credentials", {
                email: normalizedEmail,
                password,
                redirect: false,
                callbackUrl: "/notes?status=logged-in",
            })

            if (result?.error) {
                window.location.href = "/login?status=login-error"
                return
            }

            window.location.href = result?.url || "/notes"
        } catch {
            window.location.href = "/login?status=login-error"
            return
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="mx-auto max-w-md panel p-6 md:p-8">
            <div className="mb-6 space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Welcome Back</p>
                <h1 className="text-3xl font-semibold tracking-tight">Login</h1>
                <p className="text-sm text-muted-foreground">Sign in to access your notes and continue where you left off.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>
            </form>
            <p className="mt-5 text-sm text-muted-foreground">
                Need an account?{" "}
                <Link href="/register" className="font-medium text-foreground underline underline-offset-4">
                    Register
                </Link>
            </p>
        </section>
    )
}
