import {
  Globe,
  MessageCircle,
  Send,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Pencil,
  Coins,
} from "lucide-react";

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-black/30 border border-white/10 px-4 py-3">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-semibold text-sm text-right truncate max-w-[180px]">
        {value}
      </span>
    </div>
  );
}

function SocialRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-black/30 border border-white/10 px-4 py-3">
      <span className="text-green-400">{icon}</span>
      <div className="min-w-0">
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="text-white text-sm truncate">
          {value || "Not added"}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ active, activeText, inactiveText }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold border ${
        active
          ? "bg-green-500/10 text-green-400 border-green-500/30"
          : "bg-red-500/10 text-red-400 border-red-500/30"
      }`}
    >
      {active ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
      {active ? activeText : inactiveText}
    </div>
  );
}

export default function TokenPreview({
  tokenName,
  symbol,
  supply,
  decimals,
  description,
  website,
  twitter,
  telegram,
  discord,
  image,
  revokeMint,
  revokeFreeze,
  immutable,
}) {
  return (
    <div className="sticky top-8">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-2xl overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Live Preview</h2>
              <p className="text-gray-500 text-sm mt-1">
                Updates automatically
              </p>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center">
              <Coins size={22} className="text-green-400" />
            </div>
          </div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-5">
              <div className="absolute inset-0 bg-green-400/30 blur-xl rounded-full" />

              {image ? (
                <img
                  src={image}
                  alt="Token logo"
                  className="relative w-32 h-32 rounded-full object-cover border-2 border-green-400 shadow-lg shadow-green-500/20"
                />
              ) : (
                <div className="relative w-32 h-32 rounded-full bg-black/50 border-2 border-white/10 flex items-center justify-center text-5xl">
                  🪙
                </div>
              )}
            </div>

            <h3 className="text-3xl font-black tracking-tight">
              {tokenName || "Token Name"}
            </h3>

            <p className="mt-2 text-green-400 font-bold text-lg">
              {symbol || "SYMBOL"}
            </p>

            <div className="mt-4 inline-flex items-center rounded-full bg-green-500/10 border border-green-500/20 px-4 py-2 text-green-400 text-sm font-semibold">
              Solana SPL Token
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <InfoRow label="Supply" value={supply || "0"} />
            <InfoRow label="Decimals" value={decimals || "9"} />
          </div>

          <div className="rounded-2xl bg-black/30 border border-white/10 p-4 mb-5">
            <p className="text-gray-400 text-sm mb-2">Description</p>
            <p className="text-white text-sm leading-6">
              {description || "No description added yet."}
            </p>
          </div>

          <div className="space-y-3 mb-5">
            <SocialRow
              icon={<Globe size={18} />}
              label="Website"
              value={website}
            />

            <SocialRow
              icon={<MessageCircle size={18} />}
              label="Twitter / X"
              value={twitter}
            />

            <SocialRow
              icon={<Send size={18} />}
              label="Telegram"
              value={telegram}
            />

            <SocialRow
              icon={<MessageCircle size={18} />}
              label="Discord"
              value={discord}
            />
          </div>

          <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
            <p className="text-gray-400 text-sm mb-3">Security Settings</p>

            <div className="flex flex-wrap gap-2">
              <StatusBadge
                active={revokeMint}
                activeText="Mint Revoked"
                inactiveText="Mint Enabled"
              />

              <StatusBadge
                active={revokeFreeze}
                activeText="Freeze Revoked"
                inactiveText="Freeze Enabled"
              />

              <div
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold border ${
                  immutable
                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                    : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                }`}
              >
                {immutable ? <Lock size={14} /> : <Pencil size={14} />}
                {immutable ? "Metadata Immutable" : "Metadata Editable"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}