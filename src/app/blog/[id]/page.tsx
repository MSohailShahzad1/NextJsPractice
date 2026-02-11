import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Post = {
  id: number
  title: string
  body: string
}

type Comment = {
  id: number
  name: string
  email: string
  body: string
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  })

  if (res.status === 404) {
    notFound()
  }

  if (!res.ok) {
    throw new Error("Failed to fetch post")
  }

  return res.json()
}

async function getComments(id: string): Promise<Comment[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch comments")
  }

  return res.json()
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [post, comments] = await Promise.all([getPost(id), getComments(id)])

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Blog Post
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Post #{post.id}</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">Back to Posts</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base text-muted-foreground">
            <p>{post.body}</p>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Comments</h2>
            <p className="text-sm text-muted-foreground">{comments.length} total</p>
          </div>
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader>
                  <CardTitle className="text-base">{comment.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{comment.email}</p>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {comment.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
