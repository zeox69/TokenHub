import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#111827] to-black text-white">
      <section className="text-center px-6 pt-40 pb-24">
        <div className="inline-block mb-10 rounded-full border border-green-500/40 bg-green-500/10 px-6 py-3 text-green-400">
          🚀 Trusted by 500+ token creators
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold">
          Launch Your <span className="text-green-500">Solana Token</span>
        </h1>

        <p className="mt-8 text-2xl text-gray-400">
          Create, customize, and launch your own Solana token with a simple,
          secure, and beginner-friendly platform.
        </p>

        <div className="mt-12 flex justify-center gap-6">
          <Link href="/create-token" className="bg-green-500 text-black font-bold px-10 py-5 rounded-xl">
            Create Token
          </Link>

          <button className="border border-gray-600 px-10 py-5 rounded-xl font-bold">
            Connect Wallet
          </button>
        </div>
      </section>

      <section className="px-10 py-16 bg-[#111827]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1f2937] p-8 rounded-xl">
            <h3 className="text-2xl font-bold">Fast Token Creation</h3>
            <p className="text-gray-400 mt-4">Create your Solana token quickly with a simple form.</p>
          </div>

          <div className="bg-[#1f2937] p-8 rounded-xl">
            <h3 className="text-2xl font-bold">Wallet Connection</h3>
            <p className="text-gray-400 mt-4">Connect your wallet and manage your token safely.</p>
          </div>

          <div className="bg-[#1f2937] p-8 rounded-xl">
            <h3 className="text-2xl font-bold">Transparent Payment</h3>
            <p className="text-gray-400 mt-4">Clear pricing with a fixed token creation fee.</p>
          </div>
        </div>
      </section>

      <section className="px-10 py-24 text-center">
        <h2 className="text-5xl font-bold">How It Works</h2>
        <p className="text-gray-400 mt-6 text-xl">
          Launch your token in three simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          <div className="bg-[#1f2937] p-10 rounded-xl">
            <h3 className="text-3xl font-bold">1. Connect Wallet</h3>
            <p className="text-gray-400 mt-6">Connect your Phantom wallet securely.</p>
          </div>

          <div className="bg-[#1f2937] p-10 rounded-xl">
            <h3 className="text-3xl font-bold">2. Fill Token Details</h3>
            <p className="text-gray-400 mt-6">Enter your token name, symbol, supply, and logo.</p>
          </div>

          <div className="bg-[#1f2937] p-10 rounded-xl">
            <h3 className="text-3xl font-bold">3. Launch</h3>
            <p className="text-gray-400 mt-6">Confirm the payment and launch your token.</p>
          </div>
        </div>
      </section>
    </main>
  );
}