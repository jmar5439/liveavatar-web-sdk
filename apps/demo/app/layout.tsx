// app/layout.tsx
"use client";

import { ReactNode } from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-zinc-900 text-white min-h-screen flex flex-col">
          {/* Public / Landing Pages */}
          <SignedOut>{children}</SignedOut>

          {/* For pages under /app-pages, the AppLayout will handle sidebar and signed-in content */}
          <SignedIn>{children}</SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
