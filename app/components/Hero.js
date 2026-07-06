import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-24 px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-semibold mb-6">
          Token Launcher
        </span>

        <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
          Launch Your
          <span className="text-green-400"> Token </span>
          in Minutes
        </h1>

        <p className="mt-8 text-xl text-gray-400 max-w-3xl mx-auto">
          Create SPL tokens with custom metadata, logo, social links, revoke
          authorities, and launch securely on the Solana blockchain.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/create-token"
            className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl transition"
          >
            🚀 Launch Token
          </Link>

          <a
            href="#pricing"
            className="border border-gray-700 hover:border-green-400 text-white px-8 py-4 rounded-xl transition"
          >
            View Pricing
          </a>
        </div>
      </div>
    </section>  
  );
}