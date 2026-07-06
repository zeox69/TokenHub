"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "Create Token", href: "/create-token", icon: "🚀" },
    { name: "Create Liquidity", href: "/create-liquidity", icon: "💧" },
    { name: "Swap Tokens", href: "/swap", icon: "🔄" },
    { name: "Remove Liquidity", href: "/remove-liquidity", icon: "➖" },
    { name: "Support", href: "/support", icon: "❓" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#0B1120] backdrop-blur-xl">

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
  );
}