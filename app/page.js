import Header from "./components/Header";
import Link from "next/link";
import WalletCard from "./components/WalletCard";

const stats = [
  { title: "Tokens Created", value: "12,480+", text: "SPL tokens launched" },
  { title: "24H Volume", value: "$2.4M+", text: "Platform activity" },
  { title: "Liquidity Added", value: "$840K+", text: "Across pools" },
  { title: "Platform Fee", value: "0.25 SOL", text: "Per token launch" },
];

const actions = [
  {
    title: "Create Token",
    href: "/create-token",
    icon: "🚀",
    text: "Launch a new SPL token in minutes.",
  },
  {
    title: "Create Liquidity",
    href: "/create-liquidity",
    icon: "💧",
    text: "Add liquidity for your token.",
  },
  {
    title: "Swap Tokens",
    href: "/swap",
    icon: "🔄",
    text: "Swap Solana tokens easily.",
  },
  {
    title: "Remove Liquidity",
    href: "/remove-liquidity",
    icon: "➖",
    text: "Manage liquidity positions.",
  },
];

const features = [
  "Fast SPL token launch",
  "Phantom wallet support",
  "Clean launch dashboard",
  "Token preview system",
  "Liquidity tools",
  "Simple user interface",
];

const launches = [
  ["Nova Coin", "NOVA", "1B", "Live"],
  ["Moon Labs", "MOON", "500M", "Live"],
  ["SolPad", "SPAD", "100M", "Pending"],
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-white px-8 py-8 overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-10 left-1/3 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <Header />

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 xl:p-14 shadow-2xl">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-10 items-center">
            <div className="xl:col-span-7">
              <p className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
                Professional Solana Token Platform
              </p>

              <h1 className="mt-7 text-5xl xl:text-7xl font-black leading-tight tracking-tight">
                Launch your Solana token from one powerful dashboard.
              </h1>

              <p className="mt-6 max-w-3xl text-lg xl:text-xl text-gray-400 leading-8">
                Create SPL tokens, preview your project, collect launch fees,
                and manage token tools with a clean professional interface.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/create-token"
                  className="rounded-2xl bg-purple-600 px-7 py-4 font-bold transition hover:bg-purple-500 shadow-lg shadow-purple-600/20"
                >
                  Create Token
                </Link>

                <Link
                  href="/create-liquidity"
                  className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-bold transition hover:bg-white/10"
                >
                  Create Liquidity
                </Link>
              </div>
            </div>

            <div className="xl:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Launch Preview</p>
                    <h3 className="text-2xl font-bold">SolanaTools</h3>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-2xl">
                    🚀
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-gray-400 text-sm">Token Name</p>
                    <p className="text-xl font-bold mt-1">My Solana Token</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-gray-400 text-sm">Symbol</p>
                      <p className="text-xl font-bold mt-1 text-green-400">
                        MST
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-gray-400 text-sm">Fee</p>
                      <p className="text-xl font-bold mt-1 text-green-400">
                        0.25 SOL
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
                    <p className="text-green-400 font-semibold">
                      Ready to launch on Solana Devnet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <p className="text-sm text-gray-400">{item.title}</p>
              <h3 className="mt-3 text-4xl font-black">{item.value}</h3>
              <p className="mt-2 text-sm text-gray-500">{item.text}</p>
            </div>
          ))}
        </section>

        <div className="mt-8">
          <WalletCard />
        </div>

        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-3xl font-bold">Quick Actions</h2>
            <p className="text-gray-400">
              Start using the main tools instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {actions.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 transition hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-5 text-xl font-bold group-hover:text-purple-300">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">{item.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8">
            <h2 className="text-3xl font-bold">Why Choose SolanaTools?</h2>
            <p className="mt-3 text-gray-400">
              Built for creators who want a simple and fast token launch
              experience.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
              {features.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <span className="text-green-400">✓</span>{" "}
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-900/50 to-black/30 p-8">
            <h2 className="text-3xl font-bold">Launch Faster</h2>
            <p className="mt-4 text-gray-300 leading-7">
              Users can create a token, connect Phantom, approve the
              transaction, and launch in minutes.
            </p>

            <Link
              href="/create-token"
              className="mt-7 inline-block rounded-2xl bg-white px-6 py-4 font-bold text-black hover:bg-gray-200"
            >
              Start Now
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Recent Launches</h2>
            <p className="text-gray-400">Example token activity preview.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/[0.05] text-gray-400">
                <tr>
                  <th className="p-4">Token</th>
                  <th className="p-4">Symbol</th>
                  <th className="p-4">Supply</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {launches.map(([name, symbol, supply, status]) => (
                  <tr key={name} className="border-t border-white/10">
                    <td className="p-4 font-semibold">{name}</td>
                    <td className="p-4 text-gray-300">{symbol}</td>
                    <td className="p-4 text-gray-300">{supply}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          status === "Live"
                            ? "bg-green-500/10 text-green-300"
                            : "bg-yellow-500/10 text-yellow-300"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-8 border-t border-white/10 py-6 text-sm text-gray-500">
          © 2026 SolanaTools. Built for Solana creators.
        </footer>
      </div>
    </div>
  );
}