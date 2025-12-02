// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Mic,
  Video,
  Zap,
  ArrowRight,
  Users,
  Globe,
  MessageSquare,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-purple-900/20 to-zinc-900 text-white overflow-hidden">
      {/* Animated background gradient */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8 z-10">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Next-Generation AI Avatars</span>
          </div>

          {/* Main headline */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight">
            Your Interactive
            <br />
            <span className="text-purple-400">AI Avatar</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
            Bring digital experiences to life with real-time, interactive
            avatars powered by cutting-edge AI technology
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <SignedOut>
              <button
                onClick={() => router.push("/signup")}
                className="group px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/50"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => router.push("/login")}
                className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-full font-semibold text-lg transition-all border border-zinc-700"
              >
                Sign In
              </button>
            </SignedOut>
            <SignedIn>
              <button
                onClick={() => router.push("/dashboard")}
                className="group px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/50"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignedIn>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-zinc-800 mt-12">
            <div>
              <div className="text-3xl font-bold text-purple-400">100K+</div>
              <div className="text-sm text-zinc-500">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">50M+</div>
              <div className="text-sm text-zinc-500">Interactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">99.9%</div>
              <div className="text-sm text-zinc-500">Uptime</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-500/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-purple-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-zinc-400">
              Everything you need to create engaging avatar experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-zinc-800/50 backdrop-blur border border-zinc-700 rounded-2xl hover:border-purple-500/50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Video</h3>
              <p className="text-zinc-400">
                Lifelike avatars that respond instantly with fluid animations
                and natural movements
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-zinc-800/50 backdrop-blur border border-zinc-700 rounded-2xl hover:border-purple-500/50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mic className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Voice Interaction</h3>
              <p className="text-zinc-400">
                Natural voice conversations with advanced speech recognition and
                synthesis
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-zinc-800/50 backdrop-blur border border-zinc-700 rounded-2xl hover:border-purple-500/50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Chat</h3>
              <p className="text-zinc-400">
                Intelligent conversations powered by advanced language models
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 bg-zinc-800/50 backdrop-blur border border-zinc-700 rounded-2xl hover:border-purple-500/50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-User Support</h3>
              <p className="text-zinc-400">
                Handle multiple concurrent users with seamless performance
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 bg-zinc-800/50 backdrop-blur border border-zinc-700 rounded-2xl hover:border-purple-500/50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-zinc-400">
                Optimized for performance with minimal latency and maximum
                quality
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 bg-zinc-800/50 backdrop-blur border border-zinc-700 rounded-2xl hover:border-purple-500/50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-zinc-400">
                Deploy worldwide with multi-language support and global
                infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur border border-purple-500/30 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Join thousands of creators building the future of digital
              interaction
            </p>
            <SignedOut>
              <button
                onClick={() => router.push("/signup")}
                className="group px-10 py-5 bg-white text-purple-900 hover:bg-purple-50 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto shadow-2xl"
              >
                Start Creating Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignedOut>
            <SignedIn>
              <button
                onClick={() => router.push("/dashboard")}
                className="group px-10 py-5 bg-white text-purple-900 hover:bg-purple-50 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto shadow-2xl"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-zinc-800 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-zinc-500">
          <p>&copy; 2025 LiveAvatar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
