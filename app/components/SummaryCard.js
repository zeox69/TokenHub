import {
  Coins,
  Globe,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";

export default function SummaryCard({
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
  const imagePreview = image ? URL.createObjectURL(image) : null;

  const formattedSupply = supply
    ? Number(supply).toLocaleString()
    : "0";

  const estimatedPrice = 0.000001;
  const marketCap = supply ? Number(supply) * estimatedPrice : 0;

  const formattedMarketCap = marketCap.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-24 shadow-2xl">
      <p className="text-green-400 font-semibold mb-4">
        Live Preview
      </p>

      <div className="bg-black/40 border border-gray-700 rounded-3xl p-6">

        {/* Logo */}
        <div className="flex flex-col items-center text-center">

          <div className="w-28 h-28 rounded-full bg-gray-900 border border-green-400 flex items-center justify-center overflow-hidden mb-4">

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <Coins
                size={42}
                className="text-green-400"
              />
            )}

          </div>

          <h2 className="text-3xl font-bold">
            {tokenName || "Token Name"}
          </h2>

          <p className="text-gray-400 mt-1">
            ${symbol || "SYMBOL"}
          </p>

          <p className="text-gray-400 text-sm mt-4">
            {description ||
              "Your token description will appear here."}
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 gap-3 mt-8">

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="text-gray-500 text-sm">
              Supply
            </p>

            <p className="text-white font-bold">
              {formattedSupply}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="text-gray-500 text-sm">
              Decimals
            </p>

            <p className="text-white font-bold">
              {decimals || "9"}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="text-gray-500 text-sm">
              Network
            </p>

            <p className="text-white font-bold">
              Solana
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="text-gray-500 text-sm">
              Creation Fee
            </p>

            <p className="text-green-400 font-bold">
              0.25 SOL
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="text-gray-500 text-sm">
              Estimated Price
            </p>

            <p className="text-white font-bold">
              $0.000001
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="text-gray-500 text-sm">
              Market Cap
            </p>

            <p className="text-green-400 font-bold">
              ${formattedMarketCap}
            </p>
          </div>

        </div>

        {/* Social Links */}

        <div className="flex justify-center gap-5 mt-8">

          {website && (
            <Globe className="text-green-400" />
          )}

          {twitter && (
            <MessageCircle className="text-green-400" />
          )}

          {telegram && (
            <Send className="text-green-400" />
          )}

          {discord && (
            <MessageCircle className="text-green-400" />
          )}

        </div>

        {/* Security */}

        <div className="mt-8 space-y-3">

          {revokeMint && (
            <p className="text-green-400">
              <ShieldCheck
                size={16}
                className="inline mr-2"
              />
              Mint Authority Revoked
            </p>
          )}

          {revokeFreeze && (
            <p className="text-green-400">
              <ShieldCheck
                size={16}
                className="inline mr-2"
              />
              Freeze Authority Revoked
            </p>
          )}

          {immutable && (
            <p className="text-green-400">
              <ShieldCheck
                size={16}
                className="inline mr-2"
              />
              Immutable Metadata
            </p>
          )}

        </div>

      </div>
    </div>
  );
}