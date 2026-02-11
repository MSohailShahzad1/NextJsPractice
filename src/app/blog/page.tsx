import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Post = {
    id: number
    title: string
    body: string
}

async function getPosts(): Promise<Post[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        next: { revalidate: 60 },
    })

    if (!res.ok) {
        throw new Error("Failed to fetch posts")
    }

    return res.json()
}

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
                <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Blog
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">All Blog Posts</h1>
                    <p className="max-w-2xl text-base text-muted-foreground">
                        Ten quick reads pulled from a fast JSON API. Pick one and dive in.
                    </p>
                    <Button asChild variant="outline">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {posts.slice(0, 10).map((post) => (
                        <Card key={post.id} className="h-full">
                            <CardHeader>
                                <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                                <CardDescription>Post #{post.id}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                {post.body.substring(0, 120)}...
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/blog/${post.id}`}>Read More →</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
