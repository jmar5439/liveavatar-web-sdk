// app/components/SideNav.tsx
"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const menuItems: { label: string; href: string }[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Create Context", href: "/dashboard/create-context" },
    { label: "Credits", href: "/dashboard/credits" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex justify-between items-center p-4 bg-zinc-800">
        <h2 className="text-xl font-bold text-white">LiveAvatar</h2>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <XMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-zinc-800 p-4 flex flex-col gap-4 md:w-48 ${
          mobileOpen
            ? "block absolute top-16 left-0 w-full z-50"
            : "hidden md:block"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 hidden md:block">LiveAvatar</h2>

        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              <span
                className={`block p-2 rounded w-full ${
                  isActive ? "bg-zinc-700" : "hover:bg-zinc-700"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <div className="mt-auto pt-4 border-t border-zinc-700">
          <UserButton afterSignOutUrl="/login" />
        </div>
      </aside>
    </>
  );
}
