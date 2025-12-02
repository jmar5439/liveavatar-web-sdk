// app/layout.tsx
"use client";
import { useState, ReactNode } from "react";
import "./globals.css";
import CreditsPricing from "../src/components/CreditsPricing";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [menuOption, setMenuOption] = useState<"CREDITS" | "PRICING" | null>(
    null,
  );

  return (
    <html lang="en">
      <body className="bg-zinc-900 text-white flex min-h-screen">
        {/* Side Menu */}
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {menuOption && (
            <button
              className="mb-4 px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600"
              onClick={() => setMenuOption(null)}
            >
              Back to Main
            </button>
          )}

          {menuOption === "CREDITS" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Credits</h1>
              <p>Here you can see your available credits and usage.</p>
            </div>
          )}

          {menuOption === "PRICING" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Pricing</h1>
              <p>Here is the pricing information for our avatar services.</p>
              <CreditsPricing />
            </div>
          )}

          {!menuOption && children}
        </main>
      </body>
    </html>
  );
}
