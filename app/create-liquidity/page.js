"use client";

import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { initRaydium } from "../services/raydium";
import { getWalletTokens } from "../services/walletTokens";

export default function CreateLiquidity() {
  const { connected, publicKey } = useWallet();

  const [tokens, setTokens] = useState([]);
  const [tokenMint, setTokenMint] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [solAmount, setSolAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const selectedToken = tokens.find((token) => token.mint === tokenMint);

  const estimatedPrice = useMemo(() => {
    const token = Number(tokenAmount);
    const sol = Number(solAmount);

    if (!token || !sol) return "0";
    return (sol / token).toFixed(10);
  }, [tokenAmount, solAmount]);

  const canCreate = connected && tokenMint && tokenAmount && solAmount;

  useEffect(() => {
    async function loadTokens() {
      if (!publicKey) return;

      setLoading(true);

      try {
        const walletTokens = await getWalletTokens(publicKey);
        setTokens(walletTokens);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    loadTokens();
  }, [publicKey]);

  async function handleCreatePool() {
    if (!connected || !publicKey) {
      alert("Connect your Phantom wallet first.");
      return;
    }

    if (!tokenMint || !tokenAmount || !solAmount) {
      alert("Please fill all liquidity fields.");
      return;
    }

    try {
      setCreating(true);
      await initRaydium(publicKey);
      alert("Raydium connected successfully. Pool creation logic comes next.");
    } catch (error) {
      console.error(error);
      alert(error.message || "Error creating liquidity pool.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-white overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-20 left-40 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="mb-10">
          <p className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
            Liquidity Manager
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-tight">
            Create Liquidity Pool
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400 text-lg">
            Add SOL and token liquidity to prepare your project for trading.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 shadow-2xl">
              {!connected && (
                <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5 text-yellow-300">
                  Connect your Phantom wallet first.
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-gray-300 font-semibold">
                    Select Token
                  </label>

                  <select
                    value={tokenMint}
                    onChange={(e) => setTokenMint(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none hover:border-purple-400/50 transition"
                  >
                    <option value="">
                      {loading ? "Loading tokens..." : "Choose Token"}
                    </option>

                    {tokens.map((token) => (
                      <option key={token.mint} value={token.mint}>
                        {token.mint.slice(0, 6)}...{token.mint.slice(-4)} •{" "}
                        {token.amount} Tokens
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-gray-400">Selected Token</p>
                  <p className="mt-2 break-all font-mono text-purple-300">
                    {tokenMint || "No token selected"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="mb-2 block text-gray-300 font-semibold">
                      Token Amount
                    </label>

                    <input
                      value={tokenAmount}
                      onChange={(e) => setTokenAmount(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none hover:border-purple-400/50 transition"
                      placeholder="1000000"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-gray-300 font-semibold">
                      SOL Amount
                    </label>

                    <input
                      value={solAmount}
                      onChange={(e) => setSolAmount(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none hover:border-purple-400/50 transition"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-purple-500/20 bg-purple-500/10 p-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Network Fee</span>
                    <span>~0.002 SOL</span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-gray-300">Platform Fee</span>
                    <span>0.25 SOL</span>
                  </div>

                  <div className="mt-5 flex justify-between border-t border-white/10 pt-5 text-xl font-bold">
                    <span>Total</span>
                    <span className="text-green-400">0.252 SOL</span>
                  </div>
                </div>

                <button
                  onClick={handleCreatePool}
                  disabled={!canCreate || creating}
                  className={`w-full rounded-2xl py-5 text-lg font-bold transition ${
                    canCreate && !creating
                      ? "bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/20"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {creating ? "Preparing Pool..." : "Create Liquidity Pool"}
                </button>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 shadow-2xl">
              <h2 className="text-2xl font-bold">Pool Preview</h2>
              <p className="mt-1 text-sm text-gray-500">
                Estimated liquidity setup
              </p>

              <div className="mt-7 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-gray-400">Token</p>
                  <p className="mt-2 break-all font-mono text-purple-300">
                    {selectedToken
                      ? `${selectedToken.mint.slice(0, 6)}...${selectedToken.mint.slice(-4)}`
                      : "No token selected"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-sm text-gray-400">Token Amount</p>
                    <p className="mt-2 text-xl font-bold">
                      {tokenAmount || "0"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-sm text-gray-400">SOL Amount</p>
                    <p className="mt-2 text-xl font-bold">
                      {solAmount || "0"}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
                  <p className="text-sm text-gray-400">Estimated Price</p>
                  <p className="mt-2 text-xl font-bold text-green-400">
                    {estimatedPrice} SOL / token
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-gray-400">Pool Type</p>
                  <p className="mt-2 font-bold">SOL / SPL Token</p>
                </div>

                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5 text-sm text-yellow-300">
                  This page is UI-ready. The real Raydium pool transaction is
                  the next backend/blockchain step.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}