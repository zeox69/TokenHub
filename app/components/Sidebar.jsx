"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "Create Token", href: "/create-token", icon: "🚀" },
    { name: "Create Liquidity", href: "/create-liquidity", icon: "💧" },
    { name: "Remove Liquidity", href: "/remove-liquidity", icon: "➖" },
    { name: "Support", href: "/support", icon: "❓" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-[60] rounded-xl bg-purple-600 px-4 py-3 text-white shadow-lg lg:hidden"
      >
        ☰
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#0B1120] backdrop-blur-xl transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="border-b border-white/10 p-6">
          <h1 className="text-2xl font-black leading-none text-purple-400">
            Yzarvo
          </h1>

          <p className="mt-1 text-2xl font-black text-purple-400">
            TokenHub
          </p>
        </div>

        <nav className="flex-1 space-y-2 p-5">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                pathname === item.href
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}