export default function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-20">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-bold">Fast Token Creation</h3>
        <p className="mt-3 text-gray-400">
          Create your token quickly with a simple form.
        </p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-bold">Wallet Connection</h3>
        <p className="mt-3 text-gray-400">
          Connect your wallet and manage your token safely.
        </p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-bold">Transparent Payment</h3>
        <p className="mt-3 text-gray-400">
          Clear pricing with a fixed token creation fee.
        </p>
      </div>
    </section>
  );
}