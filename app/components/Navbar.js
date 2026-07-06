import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-black font-bold">
            T
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              TokenHub
            </h1>

            <p className="text-xs text-gray-400">
              Launch Tokens
            </p>
          </div>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            href="/"
            className="text-gray-300 hover:text-green-400 transition"
          >
            Home
          </Link>

          <Link
            href="/create-token"
            className="text-gray-300 hover:text-green-400 transition"
          >
            Create
          </Link>

          <a
            href="/#pricing"
            className="text-gray-300 hover:text-green-400 transition"
          >
            Pricing
          </a>

          <a
            href="/#dashboard"
            className="text-gray-300 hover:text-green-400 transition"
          >
            Dashboard
          </a>

          <Link
            href="/create-token"
            className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition"
          >
            Launch Token
          </Link>

        </div>
      </div>
    </nav>
  );
}