import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
    return (
        <main className="relative overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--color-primary),transparent_65%)]/[15] blur-2xl" />
            <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
                <header className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Inbox
                    </p>
                    <h1 className="text-3xl font-semibold sm:text-4xl">All Messages</h1>
                    <p className="text-sm text-muted-foreground">
                        Fetching the latest submissions.
                    </p>
                </header>

                <div className="mt-10 grid gap-4 lg:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Card
                            key={`loading-${index}`}
                            className="border-border/70 bg-background/80 shadow-sm"
                        >
                            <CardContent className="space-y-4 p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 animate-pulse rounded-full bg-muted" />
                                        <div className="h-3 w-40 animate-pulse rounded-full bg-muted/70" />
                                    </div>
                                    <div className="h-6 w-12 animate-pulse rounded-full bg-muted/60" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 w-full animate-pulse rounded-full bg-muted/70" />
                                    <div className="h-3 w-5/6 animate-pulse rounded-full bg-muted/70" />
                                </div>
                                <div className="h-3 w-24 animate-pulse rounded-full bg-muted/60" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    )
}
