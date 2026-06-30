"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { connection } from "../lib/solana";
import { shortenAddress } from "../lib/shortenAddress";
import { APP_CONFIG } from "../lib/config";

export default function WalletCard() {
  const { connected, publicKey } = useWallet();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function loadBalance() {
      if (!publicKey) return;

      try {
        const lamports = await connection.getBalance(publicKey);
        setBalance((lamports / LAMPORTS_PER_SOL).toFixed(4));
      } catch (error) {
        console.error(error);
        setBalance("0.0000");
      }
    }

    loadBalance();
  }, [publicKey]);

  if (!connected) return null;

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#111827] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Wallet</h2>

        <span className="rounded-full bg-green-500/10 px-3 py-1 text-green-300">
          Connected
        </span>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-sm text-gray-400">Address</p>
          <p className="font-mono">{shortenAddress(publicKey.toBase58())}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Balance</p>
          <h3 className="text-3xl font-bold">{balance ?? "..."} SOL</h3>
        </div>

        <div>
          <p className="text-sm text-gray-400">Network</p>
          <p className="text-purple-300">{APP_CONFIG.NETWORK}</p>
        </div>
      </div>
    </div>
  );
}