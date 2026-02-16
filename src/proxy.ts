import { NextResponse } from "next/server"
import { auth } from "./auth"

export const proxy = auth((req) => {
    const isLoggedIn = !!req.auth
    const pathname = req.nextUrl.pathname

    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register")
    const isNotesPage = pathname.startsWith("/notes")

    if (isAuthPage && isLoggedIn) {
        return NextResponse.redirect(new URL("/", req.nextUrl))
    }

    if (isNotesPage && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/notes/:path*", "/login", "/register"],
}
