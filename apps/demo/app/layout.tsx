// app/layout.tsx
"use client";
import { useState, ReactNode } from "react";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import "./globals.css";
import CreditsPricing from "../src/components/CreditsPricing";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [menuOption, setMenuOption] = useState<"CREDITS" | "PRICING" | null>(
    null,
  );
  const pathname = usePathname();

  // Don't show sidebar on login/signup pages
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-zinc-900 text-white flex min-h-screen">
          {/* Show sidebar only when signed in and not on auth pages */}
          <SignedIn>
            {!isAuthPage && (
              <aside className="w-48 bg-zinc-800 p-4 flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-4">LiveAvatar</h2>
                <button
                  className={`text-left p-2 rounded ${menuOption === "CREDITS" ? "bg-zinc-700" : ""}`}
                  onClick={() => setMenuOption("CREDITS")}
                >
                  Credits
                </button>
                <button
                  className={`text-left p-2 rounded ${menuOption === "PRICING" ? "bg-zinc-700" : ""}`}
                  onClick={() => setMenuOption("PRICING")}
                >
                  Pricing
                </button>
                <div className="mt-auto pt-4 border-t border-zinc-700">
                  <UserButton afterSignOutUrl="/login" />
                </div>
              </aside>
            )}
          </SignedIn>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <SignedOut>{children}</SignedOut>

            <SignedIn>
              {!isAuthPage && menuOption && (
                <button
                  className="mb-4 px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600"
                  onClick={() => setMenuOption(null)}
                >
                  Back to Main
                </button>
              )}

              {!isAuthPage && menuOption === "CREDITS" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">Credits</h1>
                  <p>Here you can see your available credits and usage.</p>
                </div>
              )}

              {!isAuthPage && menuOption === "PRICING" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">Pricing</h1>
                  <p>
                    Here is the pricing information for our avatar services.
                  </p>
                  <CreditsPricing />
                </div>
              )}

              {(!menuOption || isAuthPage) && children}
            </SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
