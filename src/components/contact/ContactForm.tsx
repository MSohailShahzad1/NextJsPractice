"use client"

import { useFormStatus } from "react-dom"
import { submitMessage } from "@/app/actions/messageActions"
import { toast } from "sonner"
import { useActionState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactForm() {
    const [state, formAction] = useActionState(submitMessage, null)
    const { pending } = useFormStatus()

    useEffect(() => {
        if (state?.success) {
            toast.success("Message sent successfully!")
        }

        if (state?.error) {
            toast.error(state.error.name?.[0] || state.error.email?.[0] || state.error.message?.[0] || "An error occurred. Please check your input.")
        }
    }, [state])

    return (
        <div className="rounded-3xl bg-linear-to-br from-border/80 via-transparent to-border/80 p-px shadow-lg">
            <Card className="border-none bg-background/80 shadow-none backdrop-blur">
                <CardContent className="space-y-6 p-6 sm:p-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Send a message</h2>
                        <p className="text-sm text-muted-foreground">
                            Tell us about your project. We’ll follow up with next steps.
                        </p>
                    </div>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="name">
                                Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Jane Doe"
                                autoComplete="name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="jane@company.com"
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="message">
                                Message
                            </label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Share the context, timeline, and goals."
                                rows={5}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Button disabled={pending} className="w-full">
                                {pending ? "Sending..." : "Send Message"}
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                By sending, you agree to our response guidelines and privacy policy.
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
