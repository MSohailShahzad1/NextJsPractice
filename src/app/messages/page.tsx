import { getMessages } from "@/lib/messageStore"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/dist/client/link"

export default async function MessagesPage() {
    const messages = await getMessages()
    const count = messages.length

    return (
        <main className="relative overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--color-primary),transparent_65%)]/[15] blur-2xl" />
            <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
                <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Inbox
                        </p>
                        <h1 className="text-3xl font-semibold sm:text-4xl">All Messages</h1>
                        <p className="text-sm text-muted-foreground">
                            Keep track of new inquiries and follow-ups from the contact form.
                        </p>
                    </div>
                    <div className="">
                        <Button asChild className="w-full sm:w-auto">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                    <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm shadow-sm backdrop-blur">
                        <p className="text-muted-foreground">Total messages</p>
                        <p className="text-2xl font-semibold">{count}</p>
                    </div>
                </header>

                {count === 0 ? (
                    <div className="mt-10 rounded-3xl border border-dashed border-border/70 bg-background/60 p-10 text-center text-sm text-muted-foreground">
                        No messages yet. When someone submits the form, they will appear here.
                    </div>
                ) : (
                    <div className="mt-10 grid gap-4 lg:grid-cols-2">
                        {messages.map((msg) => (
                            <Card
                                key={msg.id}
                                className="group relative overflow-hidden border-border/70 bg-background/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <div className="absolute inset-y-0 left-0 w-1 bg-primary/60 opacity-0 transition group-hover:opacity-100" />
                                <CardContent className="space-y-3 p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-base font-semibold">{msg.name}</p>
                                            <p className="text-sm text-muted-foreground">{msg.email}</p>
                                        </div>
                                        <span className="rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                                            New
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-foreground/90">
                                        {msg.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
