import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Next.js Blog
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Welcome to My Blog
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            A clean, fast blog experience built with Next.js, shadcn/ui, and a simple JSON API.
          </p>
          <Button asChild size="lg">
            <Link href="/blog">View Blog Posts →</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Handpicked Highlights</CardTitle>
              <CardDescription>Discover concise reads from the latest posts.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Browse summaries, jump into any story, and explore the details with one click.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fast and Focused</CardTitle>
              <CardDescription>ISR keeps the list fresh without slowing you down.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Posts are revalidated every minute for a fast, reliable reading experience.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
