import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-2/3" />

            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
            </div>

            <h2 className="text-xl font-semibold mt-8">Comments</h2>

            {[...Array(3)].map((_, index) => (
                <Card key={index}>
                    <CardHeader>
                        <Skeleton className="h-4 w-1/3" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5 mt-2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
