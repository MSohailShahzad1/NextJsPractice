"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface Props {
    isAuthenticated: boolean
}

function navLinkClass(isActive: boolean) {
    return cn(
        "rounded-md px-3 py-1.5 text-sm transition",
        isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
    )
}

export default function NavLinks({ isAuthenticated }: Props) {
    const pathname = usePathname()

    const isHomeActive = pathname === "/"
    const isNotesActive = pathname === "/notes" || pathname.startsWith("/notes/")
    const isLoginActive = pathname === "/login"

    return (
        <>
            <Link href="/" className={navLinkClass(isHomeActive)}>
                Home
            </Link>
            <Link href="/notes" className={navLinkClass(isNotesActive)}>
                Notes
            </Link>
            {!isAuthenticated ? (
                <Link href="/login" className={navLinkClass(isLoginActive)}>
                    Login
                </Link>
            ) : null}
        </>
    )
}
