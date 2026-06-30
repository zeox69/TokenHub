"use client";

import { Mail, MessageCircle, Send, HelpCircle, Shield, Clock } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-20 left-1/3 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="mb-10">
          <p className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
            Help Center
          </p>

          <h1 className="mt-5 text-5xl font-black">
            Support
          </h1>

          <p className="mt-3 text-lg text-gray-400">
            Need help? Contact us or browse our frequently asked questions.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* FAQ */}
          <div className="xl:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl">

              <h2 className="text-3xl font-bold mb-8">
                Frequently Asked Questions
              </h2>

              <div className="space-y-5">

                {[
                  {
                    q: "Which blockchain is supported?",
                    a: "Solana Devnet now. Mainnet support will be available soon.",
                  },
                  {
                    q: "How much does token creation cost?",
                    a: "The platform charges 0.25 SOL for token creation.",
                  },
                  {
                    q: "Which wallet can I use?",
                    a: "Currently Phantom Wallet is fully supported.",
                  },
                  {
                    q: "Can I revoke authorities?",
                    a: "Yes. Mint Authority, Freeze Authority and Immutable Metadata are supported.",
                  },
                  {
                    q: "Can I add liquidity?",
                    a: "Yes. Liquidity tools are integrated with Raydium (backend integration in progress).",
                  },
                ].map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-white/10 bg-black/30 p-6"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="text-purple-400" size={20} />
                      <h3 className="font-bold text-lg">
                        {item.q}
                      </h3>
                    </div>

                    <p className="mt-3 text-gray-400 leading-7">
                      {item.a}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="xl:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl">

              <h2 className="text-3xl font-bold">
                Contact Us
              </h2>

              <p className="mt-2 text-gray-400">
                Our team usually replies within 24 hours.
              </p>

              <div className="mt-8 space-y-5">

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                  <Mail className="text-green-400" size={20} />

                  <input
                    className="w-full bg-transparent outline-none"
                    placeholder="Your email"
                  />
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                  <MessageCircle className="text-green-400 mt-1" size={20} />

                  <textarea
                    className="w-full bg-transparent outline-none min-h-[160px] resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button className="w-full rounded-2xl bg-purple-600 hover:bg-purple-500 py-5 text-lg font-bold transition">
                  <div className="flex justify-center items-center gap-2">
                    <Send size={18} />
                    Send Message
                  </div>
                </button>

              </div>

              <div className="mt-8 grid grid-cols-1 gap-4">

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5 flex items-center gap-4">
                  <Clock className="text-purple-400" />
                  <div>
                    <p className="font-semibold">
                      Response Time
                    </p>
                    <p className="text-sm text-gray-400">
                      Less than 24 hours
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5 flex items-center gap-4">
                  <Shield className="text-green-400" />
                  <div>
                    <p className="font-semibold">
                      Secure Support
                    </p>
                    <p className="text-sm text-gray-400">
                      Your information stays private.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}