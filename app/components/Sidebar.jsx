import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">Solana Tools</h1>

      <nav className="space-y-3">
        <Link className="block px-4 py-3 rounded-xl hover:bg-gray-800" href="/">Home</Link>
        <Link className="block px-4 py-3 rounded-xl hover:bg-gray-800" href="/create-token">Create Token</Link>
        <Link className="block px-4 py-3 rounded-xl hover:bg-gray-800" href="/create-liquidity">Create Liquidity</Link>
        <Link className="block px-4 py-3 rounded-xl hover:bg-gray-800" href="/swap">Swap Tokens</Link>
        <Link className="block px-4 py-3 rounded-xl hover:bg-gray-800" href="/remove-liquidity">Remove Liquidity</Link>
        <Link className="block px-4 py-3 rounded-xl hover:bg-gray-800" href="/support">Support</Link>
      </nav>
    </aside>
  );
}