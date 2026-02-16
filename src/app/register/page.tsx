"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) {
                router.push("/register?status=register-error")
                return
            }

            router.push("/login?status=registered")
        } catch {
            router.push("/register?status=register-error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="mx-auto max-w-md panel p-6 md:p-8">
            <div className="mb-6 space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Get Started</p>
                <h1 className="text-3xl font-semibold tracking-tight">Create account</h1>
                <p className="text-sm text-muted-foreground">Register once and manage all your notes securely.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required
                    />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Registering..." : "Register"}
                </Button>
            </form>
            <p className="mt-5 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-foreground underline underline-offset-4">
                    Login
                </Link>
            </p>
        </section>
    )
}
