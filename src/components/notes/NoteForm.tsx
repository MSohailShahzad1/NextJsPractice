"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NoteFormProps {
    action: (formData: FormData) => void;
    defaultValues?: {
        title?: string;
        content?: string;
    };
    submitLabel: string;
}

export function NoteForm({
    action,
    defaultValues,
    submitLabel,
}: NoteFormProps) {
    return (
        <form action={action} className="space-y-5 rounded-xl border bg-card p-5 shadow-sm">
            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                    Title
                </label>
                <Input
                    id="title"
                    name="title"
                    placeholder="Weekly planning notes"
                    defaultValue={defaultValues?.title}
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                    Content
                </label>
                <Textarea
                    id="content"
                    name="content"
                    placeholder="Capture your ideas, tasks, or reminders here..."
                    defaultValue={defaultValues?.content}
                    required
                    className="min-h-36"
                />
            </div>

            <SubmitButton submitLabel={submitLabel} />
        </form>
    );
}

function SubmitButton({ submitLabel }: { submitLabel: string }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? "Saving..." : submitLabel}
        </Button>
    );
}
