"use client";

import ConnectWalletButton from "./ConnectWalletButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#080b16]/80 px-6 py-4 backdrop-blur-xl">
      <div>
        <h1 className="text-xl font-bold text-white">
          Yzarvo <span className="text-purple-400">TokenHub</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <ConnectWalletButton />
      </div>
    </header>
  );
}