export default function Stats() {
  return (
    <section className="px-10 py-20 border-y border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-5xl font-bold text-green-500">
            500+
          </h2>

          <p className="mt-3 text-gray-400">
            Tokens Created
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-5xl font-bold text-purple-500">
            250+
          </h2>

          <p className="mt-3 text-gray-400">
            Active Users
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-5xl font-bold text-blue-500">
            0.25 SOL
          </h2>

          <p className="mt-3 text-gray-400">
            Creation Fee
          </p>
        </div>

      </div>
    </section>
  );
}