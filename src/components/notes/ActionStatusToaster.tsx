"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const STATUS_TO_TOAST: Record<string, { type: "success" | "error"; message: string }> = {
    created: { type: "success", message: "Note created successfully." },
    updated: { type: "success", message: "Note updated successfully." },
    deleted: { type: "success", message: "Note deleted successfully." },
    "create-error": { type: "error", message: "Could not create note. Please try again." },
    "update-error": { type: "error", message: "Could not update note. Please try again." },
    "delete-error": { type: "error", message: "Could not delete note. Please try again." },
};

export function ActionStatusToaster() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastHandledKey = useRef<string | null>(null);

    useEffect(() => {
        const status = searchParams.get("status");
        if (!status) return;

        const toastConfig = STATUS_TO_TOAST[status];
        if (!toastConfig) return;

        const key = `${pathname}?${searchParams.toString()}`;
        if (lastHandledKey.current === key) return;
        lastHandledKey.current = key;

        if (toastConfig.type === "success") {
            toast.success(toastConfig.message);
        } else {
            toast.error(toastConfig.message);
        }

        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.delete("status");
        const nextUrl = nextParams.toString()
            ? `${pathname}?${nextParams.toString()}`
            : pathname;

        router.replace(nextUrl, { scroll: false });
    }, [pathname, router, searchParams]);

    return <Toaster position="top-right" richColors />;
}
