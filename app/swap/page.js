"use client";

import { useEffect, useMemo, useState } from "react";
import { VersionedTransaction, Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

const TOKENS = [
  {
    symbol: "SOL",
    name: "Solana",
    mint: "So11111111111111111111111111111111111111112",
    decimals: 9,
  },

  {
    symbol: "USDC",
    name: "USD Coin",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
  },


  {
    symbol: "JUP",
    name: "Jupiter",
    mint: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    decimals: 6,
  },

  {
    symbol: "BONK",
    name: "Bonk",
    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    decimals: 5,
  },
];
export default function SwapPage() {
  const wallet = useWallet();

const connection = new Connection(
  "https://solana-rpc.publicnode.com",
  "confirmed"
);
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [message, setMessage] = useState("");
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);

  const estimatedReceive = useMemo(() => {
    if (!quote?.outAmount) return "0.00";

    const to = TOKENS.find((t) => t.symbol === toToken);
    if (!to) return "0.00";

    return (Number(quote.outAmount) / Math.pow(10, to.decimals)).toFixed(4);
  }, [quote, toToken]);

  async function fetchQuote() {
    if (!amount || Number(amount) <= 0) {
      setQuote(null);
      setMessage("");
      return;
    }

    const from = TOKENS.find((t) => t.symbol === fromToken);
    const to = TOKENS.find((t) => t.symbol === toToken);

    if (!from || !to) return;

    if (from.mint === to.mint) {
      setQuote(null);
      setMessage("Choose two different tokens.");
      return;
    }

    try {
      setQuoteLoading(true);
      setMessage("");

      const amountLamports = Math.floor(
        Number(amount) * Math.pow(10, from.decimals)
      );

      const response = await fetch(
        `https://lite-api.jup.ag/swap/v1/quote?inputMint=${from.mint}&outputMint=${to.mint}&amount=${amountLamports}&slippageBps=${Number(slippage) * 100}`
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        console.error("Jupiter quote error:", data);
        setQuote(null);
        setMessage(data.error || "No route found for this token pair.");
        return;
      }

      console.log("Jupiter quote:", data);
      setQuote(data);
    } catch (error) {
      console.error(error);
      setQuote(null);
      setMessage("Could not fetch Jupiter quote.");
    } finally {
      setQuoteLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, [amount, fromToken, toToken, slippage]);

  async function handleSwap() {
  try {
    if (!wallet.connected || !wallet.publicKey) {
      setMessage("Connect Phantom first.");
      return;
    }

    if (!quote) {
      setMessage("No quote found. Enter an amount first.");
      return;
    }

    setMessage("Preparing swap transaction...");

    const response = await fetch("https://lite-api.jup.ag/swap/v1/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteResponse: quote,
        userPublicKey: wallet.publicKey.toString(),
        wrapAndUnwrapSol: true,
        dynamicComputeUnitLimit: true,
        prioritizationFeeLamports: {
          priorityLevelWithMaxLamports: {
            priorityLevel: "high",
            maxLamports: 1000000,
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Jupiter swap error:", data);
      setMessage(data.error || "Could not create swap transaction.");
      return;
    }

    const swapTransactionBuf = Buffer.from(data.swapTransaction, "base64");
    const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

    setMessage("Confirm the swap in Phantom...");

    const signedTransaction = await wallet.signTransaction(transaction);

    const txid = await connection.sendRawTransaction(
      signedTransaction.serialize(),
      {
        skipPreflight: false,
        maxRetries: 3,
      }
    );

    setMessage("Swap sent. Confirming transaction...");

    await connection.confirmTransaction(txid, "confirmed");

    setMessage(`Swap successful: ${txid}`);
  } catch (error) {
    console.error(error);
    setMessage(error.message || "Swap failed.");
  }
}

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

          <h1 className="mt-5 text-5xl font-black">Swap Tokens</h1>

          <p className="mt-3 text-lg text-gray-400">
            Swap SOL, BTC, ETH, USDC, and USDT with live Jupiter quotes.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 shadow-2xl">
              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-400">From</span>
                    <span className="text-gray-500 text-sm">Balance: --</span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <select
                      value={fromToken}
                      onChange={(e) => setFromToken(e.target.value)}
                      className="rounded-2xl bg-[#0B1120] border border-white/10 px-5 py-4 outline-none"
                    >
                      {TOKENS.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
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
                      {quoteLoading ? "Getting best quote..." : "Estimated"}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <select
                      value={toToken}
                      onChange={(e) => setToToken(e.target.value)}
                      className="rounded-2xl bg-[#0B1120] border border-white/10 px-5 py-4 outline-none"
                    >
                      {TOKENS.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>

                    <input
                      readOnly
                      value={quoteLoading ? "Loading..." : estimatedReceive}
                      className="md:col-span-2 rounded-2xl bg-[#0B1120] border border-white/10 px-5 py-4"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSwap}
                  className="w-full rounded-2xl bg-purple-600 hover:bg-purple-500 py-5 text-lg font-bold transition"
                >
                  Swap Tokens
                </button>

                {message && (
                  <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5 text-yellow-300">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 shadow-2xl">
              <h2 className="text-2xl font-bold">Swap Preview</h2>

              <div className="mt-7 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-gray-400">You Pay</p>
                  <p className="mt-2 text-2xl font-bold">
                    {amount || "0"} {fromToken}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-gray-400">You Receive</p>
                  <p className="mt-2 text-2xl font-bold text-green-400">
                    {quoteLoading ? "Loading..." : estimatedReceive} {toToken}
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
                      <option value="0.1">0.1%</option>
                      <option value="0.5">0.5%</option>
                      <option value="1">1%</option>
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <span>Price Impact</span>
                    <span className="text-green-400">
                      {quote?.priceImpactPct
                        ? `${Number(quote.priceImpactPct).toFixed(4)}%`
                        : "--"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Route</span>
                    <span className="text-purple-400">Jupiter</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Network Fee</span>
                    <span>~0.0005 SOL</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-green-300 text-sm">
                  Live Jupiter quotes are connected. Real swap execution is the
                  next development step.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}