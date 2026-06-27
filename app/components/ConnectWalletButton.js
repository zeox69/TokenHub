"use client";
export default function ConnectWalletButton() {
  async function connectWallet() {
    if (!window.solana || !window.solana.isPhantom) {
      alert("Please install Phantom Wallet first.");
      return;
    }

    const response = await window.solana.connect();
    alert("Connected: " + response.publicKey.toString());
  }

  return (
    <button
      onClick={connectWallet}
      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl"
    >
      Connect Phantom Wallet
    </button>
  );
}