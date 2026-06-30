"use client";

import { useMemo, useState } from "react";

export default function RemoveLiquidityPage() {
  const [poolAddress, setPoolAddress] = useState("");
  const [percent, setPercent] = useState("50");

  const canRemove = poolAddress && percent;

  const estimatedReturn = useMemo(() => {
    const p = Number(percent);
    if (!p) return "0";
    return `${p}% of your LP position`;
  }, [percent]);

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-white overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute bottom-20 left-40 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="mb-10">
          <p className="inline-flex rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
            Liquidity Manager
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-tight">
            Remove Liquidity
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400 text-lg">
            Withdraw liquidity from your token pool and manage your LP position.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-gray-300 font-semibold">
                    Pool Address
                  </label>

                  <input
                    value={poolAddress}
                    onChange={(e) => setPoolAddress(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none hover:border-red-400/50 transition"
                    placeholder="Enter pool address"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-gray-300 font-semibold">
                    Remove Percentage
                  </label>

                  <input
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none hover:border-red-400/50 transition"
                    placeholder="50"
                  />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {["25", "50", "75", "100"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setPercent(item)}
                      className="rounded-2xl border border-white/10 bg-black/30 py-3 font-bold hover:border-red-400/50 hover:bg-red-500/10 transition"
                    >
                      {item}%
                    </button>
                  ))}
                </div>

                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Network Fee</span>
                    <span>~0.002 SOL</span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-gray-300">Platform Fee</span>
                    <span>0.10 SOL</span>
                  </div>

                  <div className="mt-5 flex justify-between border-t border-white/10 pt-5 text-xl font-bold">
                    <span>Remove Amount</span>
                    <span className="text-red-400">{percent || "0"}%</span>
                  </div>
                </div>

                <button
                  disabled={!canRemove}
                  className={`w-full rounded-2xl py-5 text-lg font-bold transition ${
                    canRemove
                      ? "bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/20"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Remove Liquidity
                </button>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 shadow-2xl">
              <h2 className="text-2xl font-bold">Withdrawal Preview</h2>
              <p className="mt-1 text-sm text-gray-500">
                Estimated liquidity removal
              </p>

              <div className="mt-7 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-gray-400">Pool</p>
                  <p className="mt-2 break-all font-mono text-purple-300">
                    {poolAddress || "No pool selected"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-gray-400">Percentage</p>
                  <p className="mt-2 text-2xl font-bold text-red-400">
                    {percent || "0"}%
                  </p>
                </div>

                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
                  <p className="text-sm text-gray-400">Estimated Return</p>
                  <p className="mt-2 font-bold text-green-400">
                    {estimatedReturn}
                  </p>
                </div>

                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5 text-sm text-yellow-300">
                  Real LP withdrawal will be connected after Raydium integration.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}