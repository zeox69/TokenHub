export default function HowItWorks() {
  return (
    <section className="px-10 py-20 bg-gray-950 text-center">
      <h2 className="text-4xl font-bold">
        How It Works
      </h2>

      <p className="mt-4 text-gray-400">
        Launch your token in three simple steps.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold">1. Connect Wallet</h3>
          <p className="mt-4 text-gray-400">
            Connect your Phantom wallet securely.
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold">2. Fill Token Details</h3>
          <p className="mt-4 text-gray-400">
            Enter your token name, symbol, supply, and logo.
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold">3. Launch</h3>
          <p className="mt-4 text-gray-400">
            Confirm the payment and launch your token.
          </p>
        </div>
      </div>
    </section>
  );
}