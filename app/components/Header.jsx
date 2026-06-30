"use client";
import ConnectWalletButton from "./ConnectWalletButton";
export default function Header() {
  return (
    <header className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-[#111827] p-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-gray-400">
          Welcome to your Solana token platform.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2">
          <span className="text-sm text-green-300">
            ● Solana Network Online
          </span>
        </div>

        <ConnectWalletButton />
      </div>
    </header>
  );
}