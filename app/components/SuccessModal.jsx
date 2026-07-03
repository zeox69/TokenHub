"use client";

export default function SuccessModal({ open, onClose, mint, tx }) {
  if (!open) return null;

  async function copy(text) {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  }

  function handleClose() {
    const confirmClose = window.confirm(
      "Before closing:\n\n• Your token has already been created.\n• Save your Mint Address and Transaction ID.\n• You can also find them later in your wallet or on Solana Explorer.\n\nClose this window?"
    );

    if (confirmClose) {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-[#111827] border border-green-500/20 p-8">
        <h2 className="text-3xl font-bold text-green-400">
          🎉 Token Created!
        </h2>

        <p className="text-gray-400 mt-2">
          Your token was created successfully.
        </p>

        <div className="mt-8">
          <p className="text-gray-400 mb-2">Mint Address</p>

          <div className="flex gap-3">
            <div className="flex-1 rounded-xl bg-black/40 p-4 break-all text-white">
              {mint}
            </div>

            <button
              onClick={() => copy(mint)}
              className="rounded-xl bg-green-500 hover:bg-green-400 px-6 font-bold text-black"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-400 mb-2">Transaction</p>

          <div className="flex gap-3">
            <div className="flex-1 rounded-xl bg-black/40 p-4 break-all text-white">
              {tx}
            </div>

            <button
              onClick={() => copy(tx)}
              className="rounded-xl bg-green-500 hover:bg-green-400 px-6 font-bold text-black"
            >
              Copy
            </button>
          </div>
        </div>

        <a
          href={`https://explorer.solana.com/address/${mint}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block w-full rounded-xl bg-blue-600 py-4 text-center font-bold text-white hover:bg-blue-500"
        >
          View on Solana Explorer
        </a>

        <a
          href={`https://dexscreener.com/solana/${mint}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full rounded-xl bg-purple-600 py-4 text-center font-bold text-white hover:bg-purple-500"
        >
          View on DexScreener
        </a>

        <button
          onClick={handleClose}
          className="mt-8 w-full rounded-xl bg-green-500 py-4 font-bold text-black hover:bg-green-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}