"use client";

import { useMemo, useState } from "react";

const TOKENS = [
  { symbol: "SOL", name: "Solana" },
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "BONK", name: "Bonk" },
  { symbol: "JUP", name: "Jupiter" },
];

export default function SwapPage() {
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");

  const estimatedReceive = useMemo(() => {
    const value = Number(amount);
    if (!value) return "0.00";
    return (value * 18.74).toFixed(2);
  }, [amount]);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-20 left-1/3 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="mb-10">
          <p className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
            Token Swap
          </p>

          <h1 className="mt-5 text-5xl font-black">
            Swap Tokens
          </h1>

          <p className="mt-3 text-lg text-gray-400">
            Swap SOL and SPL tokens with a professional interface.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 shadow-2xl">

              <div className="space-y-6">

                <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-400">From</span>
                    <span className="text-gray-500 text-sm">
                      Balance: 2.51 SOL
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <select
                      value={fromToken}
                      onChange={(e) => setFromToken(e.target.value)}
                      className="rounded-2xl bg-[#0B1120] border border-white/10 px-5 py-4 outline-none"
                    >
                      {TOKENS.map((token) => (
                        <option key={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>

                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="md:col-span-2 rounded-2xl bg-[#0B1120] border border-white/10 px-5 py-4 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-2xl shadow-lg">
                    ⇅
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-400">To</span>
                    <span className="text-gray-500 text-sm">
                      Estimated
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <select
                      value={toToken}
                      onChange={(e) => setToToken(e.target.value)}
                      className="rounded-2xl bg-[#0B1120] border border-white/10 px-5 py-4 outline-none"
                    >
                      {TOKENS.map((token) => (
                        <option key={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>

                    <input
                      readOnly
                      value={estimatedReceive}
                      className="md:col-span-2 rounded-2xl bg-[#0B1120] border border-white/10 px-5 py-4"
                    />
                  </div>
                </div>

                <button className="w-full rounded-2xl bg-purple-600 hover:bg-purple-500 py-5 text-lg font-bold transition">
                  Swap Tokens
                </button>

              </div>
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 shadow-2xl">

              <h2 className="text-2xl font-bold">
                Swap Preview
              </h2>

              <div className="mt-7 space-y-4">

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-gray-400">
                    You Pay
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {amount || "0"} {fromToken}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-gray-400">
                    You Receive
                  </p>

                  <p className="mt-2 text-2xl font-bold text-green-400">
                    {estimatedReceive} {toToken}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-4">

                  <div className="flex justify-between">
                    <span>Slippage</span>

                    <select
                      value={slippage}
                      onChange={(e) => setSlippage(e.target.value)}
                      className="bg-transparent"
                    >
                      <option>0.1</option>
                      <option>0.5</option>
                      <option>1</option>
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <span>Price Impact</span>
                    <span className="text-green-400">&lt;0.01%</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Route</span>
                    <span className="text-purple-400">
                      Jupiter
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Network Fee</span>
                    <span>~0.0005 SOL</span>
                  </div>

                </div>

                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-green-300 text-sm">
                  Jupiter integration will execute the real on-chain swap in the next development step.
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}