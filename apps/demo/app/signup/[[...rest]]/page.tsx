// app/signup/page.tsx
"use client";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">LiveAvatar</h1>
          <p className="text-zinc-400">Create your account</p>
        </div>

        <div className="bg-zinc-800 rounded-lg p-8 shadow-xl">
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none",
                headerTitle: "text-white",
                headerSubtitle: "text-zinc-400",
                socialButtonsBlockButton:
                  "bg-zinc-700 text-white hover:bg-zinc-600",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                formFieldInput: "bg-zinc-700 border-zinc-600 text-white",
                formFieldLabel: "text-zinc-300",
                footerActionLink: "text-blue-400 hover:text-blue-300",
                identityPreviewText: "text-white",
                identityPreviewEditButton: "text-blue-400",
              },
            }}
            redirectUrl="/dashboard"
            signInUrl="/login"
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
