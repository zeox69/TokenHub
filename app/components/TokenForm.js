"use client";


import ConnectWalletButton from "./ConnectWalletButton";
import {
  Upload,
  Globe,
  Coins,
  BadgeDollarSign,
  FileText,
  MessageCircle,
  Send,
  ShieldCheck,
  Rocket,
} from "lucide-react";

function InputBox({ icon, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-black/40 border border-gray-700 px-4 py-3">
      <span className="text-green-400">{icon}</span>
      <input
        type={type}
        className="w-full bg-transparent outline-none text-white placeholder-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between bg-black/40 border border-gray-700 rounded-xl p-4"
    >
      <div className="flex items-center gap-3 text-gray-300">
        <ShieldCheck size={20} className="text-green-400" />
        {label}
      </div>

      <div className={`w-12 h-6 rounded-full p-1 ${checked ? "bg-green-500" : "bg-gray-700"}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition ${checked ? "translate-x-6" : ""}`} />
      </div>
    </button>
  );
}

export default function TokenForm({
  tokenName,
  setTokenName,
  symbol,
  setSymbol,
  supply,
  setSupply,
  decimals,
  setDecimals,
  description,
  setDescription,
  website,
  setWebsite,
  twitter,
  setTwitter,
  telegram,
  setTelegram,
  discord,
  setDiscord,
  image,
  setImage,
  revokeMint,
  setRevokeMint,
  revokeFreeze,
  setRevokeFreeze,
  immutable,
  setImmutable,
}) {
 

  const canLaunch = tokenName && symbol && supply;

  return (
    <section>
      <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <Coins size={34} className="text-green-400" />
            <h2 className="text-3xl font-bold text-white">Create Your Token</h2>
          </div>
          <p className="text-gray-400 mt-2">Launch your Solana token in minutes</p>
        </div>

        <div className="space-y-5">
          <label className="border-2 border-dashed border-gray-600 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition bg-black/30">
            {image ? (
              <img
                src={image}
                alt="Token logo preview"
                className="w-24 h-24 rounded-full object-cover mb-4 border border-green-400"
              />
            ) : (
              <Upload size={45} className="text-green-400 mb-4" />
            )}

            <span className="text-white font-semibold">Upload Token Logo</span>
            <span className="text-gray-500 text-sm mt-2">PNG • JPG • WEBP</span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(URL.createObjectURL(file));
                }
              }}
            />
          </label>

          <InputBox icon={<Coins size={20} />} placeholder="Token Name" value={tokenName} onChange={(e) => setTokenName(e.target.value)} />

          <InputBox icon={<BadgeDollarSign size={20} />} placeholder="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} />

          <InputBox icon={<BadgeDollarSign size={20} />} placeholder="Supply" value={supply} onChange={(e) => setSupply(e.target.value)} />

          <InputBox icon={<Coins size={20} />} placeholder="Decimals" type="number" value={decimals} onChange={(e) => setDecimals(e.target.value)} />

          <div className="flex gap-3 rounded-xl bg-black/40 border border-gray-700 px-4 py-3">
            <FileText size={20} className="text-green-400 mt-1" />
            <textarea
              className="w-full bg-transparent outline-none text-white placeholder-gray-500 min-h-28"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <InputBox icon={<Globe size={20} />} placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />

          <InputBox icon={<MessageCircle size={20} />} placeholder="Twitter X" value={twitter} onChange={(e) => setTwitter(e.target.value)} />

          <InputBox icon={<Send size={20} />} placeholder="Telegram" value={telegram} onChange={(e) => setTelegram(e.target.value)} />

          <InputBox icon={<MessageCircle size={20} />} placeholder="Discord" value={discord} onChange={(e) => setDiscord(e.target.value)} />

          <div className="space-y-3">
            <Toggle label="Revoke Mint Authority" checked={revokeMint} onChange={setRevokeMint} />
            <Toggle label="Revoke Freeze Authority" checked={revokeFreeze} onChange={setRevokeFreeze} />
            <Toggle label="Immutable Metadata" checked={immutable} onChange={setImmutable} />
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-5">
            <div className="flex justify-between">
              <span className="text-gray-300">Creation Fee</span>
              <span className="text-green-400 font-bold">0.25 SOL</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Fee is required before launching the token.
            </p>
          </div>

          <ConnectWalletButton />

          <button
            disabled={!canLaunch}
            className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition ${
              canLaunch
                ? "bg-green-500 hover:bg-green-400 text-black"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Rocket size={20} />
            Launch Token
          </button>
        </div>
      </div>
    </section>
  );
}