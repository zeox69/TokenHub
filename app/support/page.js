"use client";

import { useState } from "react";
import {
  Mail,
  MessageCircle,
  Send,
  Shield,
  Clock,
  Wallet,
  Coins,
  Droplets,
} from "lucide-react";

export default function SupportPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || "Failed to send message.");
        return;
      }

      setStatus("Message sent successfully!");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const faqs = [
    {
      icon: Wallet,
      q: "Which blockchain is supported?",
      a: "Yzarvo TokenHub currently supports Solana Mainnet.",
    },
    {
      icon: Coins,
      q: "How much does token creation cost?",
      a: "Token creation has a platform fee of 0.25 SOL.",
    },
    {
      icon: Wallet,
      q: "Which wallet can I use?",
      a: "Phantom Wallet is currently supported.",
    },
    {
      icon: Shield,
      q: "Can I revoke authorities?",
      a: "Yes. Mint authority, freeze authority, and immutable metadata options are supported.",
    },
    {
      icon: Droplets,
      q: "Can I add liquidity?",
      a: "Yes. Liquidity tools are integrated with Raydium.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] p-6 text-white md:p-8">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/3 top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute left-10 top-1/2 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <section className="mb-10">
          <p className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
            Help Center
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            Support
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            Need help with Yzarvo TokenHub? Browse the common questions or send
            us a message.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-12">
          <section className="xl:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-8">
              <h2 className="mb-8 text-2xl font-bold md:text-3xl">
                Frequently Asked Questions
              </h2>

              <div className="space-y-5">
                {faqs.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.q}
                      className="rounded-2xl border border-white/10 bg-black/30 p-6 transition hover:border-purple-400/40 hover:bg-black/40"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="text-purple-400" size={21} />
                        <h3 className="text-lg font-bold">{item.q}</h3>
                      </div>

                      <p className="mt-3 leading-7 text-gray-400">{item.a}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="xl:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-8">
              <h2 className="text-2xl font-bold md:text-3xl">Contact Us</h2>

              <p className="mt-2 leading-7 text-gray-400">
                Our team usually replies within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-300">
                    Email Address
                  </span>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 focus-within:border-purple-400/50">
                    <Mail className="text-green-400" size={20} />

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-300">
                    Message
                  </span>

                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 focus-within:border-purple-400/50">
                    <MessageCircle className="mt-1 text-green-400" size={20} />

                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[160px] w-full resize-none bg-transparent text-white outline-none placeholder:text-gray-500"
                      placeholder="How can we help you?"
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 py-5 text-lg font-bold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]"
                >
                  <Send size={18} />
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {status && (
                  <p className="text-center text-sm font-semibold text-green-400">
                    {status}
                  </p>
                )}
              </form>

              <div className="mt-8 grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-5">
                  <Clock className="text-purple-400" />

                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-sm text-gray-400">Less than 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-5">
                  <Shield className="text-green-400" />

                  <div>
                    <p className="font-semibold">Secure Support</p>
                    <p className="text-sm text-gray-400">
                      Your information stays private.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}