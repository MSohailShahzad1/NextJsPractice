"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="relative overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--color-primary),transparent_65%)]/[15] blur-2xl" />
            <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
                <Card className="border-border/70 bg-background/80 shadow-lg">
                    <CardContent className="space-y-6 p-8">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Messages
                            </p>
                            <h1 className="text-3xl font-semibold sm:text-4xl">
                                We couldn’t load the inbox.
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Something went wrong while fetching the messages. Try again
                                or come back later.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button onClick={reset}>Try again</Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                            >
                                Reload page
                            </Button>
                        </div>
                        {error?.digest ? (
                            <p className="text-xs text-muted-foreground">
                                Error reference: {error.digest}
                            </p>
                        ) : null}
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
