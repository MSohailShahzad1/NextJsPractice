import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { ActionStatusToaster } from "@/components/notes/ActionStatusToaster";
import { Button } from "@/components/ui/button";
import NavLinks from "@/components/layout/NavLinks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes App",
  description: "Modern notes app with authentication and productivity tools",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="app-shell">
          <header className="panel mb-8 px-5 py-4 md:px-6">
            <nav className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                <Link href="/" className="text-sm font-semibold tracking-wide">
                  Notes Studio
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <NavLinks isAuthenticated={Boolean(session?.user)} />
                {session?.user ? (
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/?status=logged-out" });
                    }}
                  >
                    <Button type="submit" size="sm" variant="outline">
                      Logout
                    </Button>
                  </form>
                ) : (
                  <>
                    <Button asChild size="sm">
                      <Link href="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </header>

          <main>{children}</main>
        </div>
        <ActionStatusToaster />
      </body>
    </html>
  );
}
