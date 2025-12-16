// app/app-pages/layout.tsx
"use client";
import { ReactNode } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SideNav from "../../src/components/SideNav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SignedIn>
      <div className="flex min-h-screen bg-zinc-900 text-white">
        <SideNav />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      <SignedOut>
        <p className="p-6 text-center">
          You must be signed in to view this page.
        </p>
      </SignedOut>
    </SignedIn>
  );
}
