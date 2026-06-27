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
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-8">
      <h2 className="text-2xl font-bold mb-6">Live Preview</h2>

      <div className="flex flex-col items-center text-center mb-6">
        {image ? (
          <img
            src={image}
            alt="Token logo"
            className="w-24 h-24 rounded-full object-cover border border-green-400 mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-black/40 border border-gray-700 flex items-center justify-center mb-4 text-3xl">
            🪙
          </div>
        )}

        <h3 className="text-2xl font-bold">
          {tokenName || "Token Name"}
        </h3>

        <p className="text-green-400 font-semibold">
          {symbol || "SYMBOL"}
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <p><span className="text-gray-400">Supply:</span> {supply || "0"}</p>
        <p><span className="text-gray-400">Decimals:</span> {decimals || "9"}</p>
        <p><span className="text-gray-400">Description:</span> {description || "No description"}</p>
        <p><span className="text-gray-400">Website:</span> {website || "Not added"}</p>
        <p><span className="text-gray-400">Twitter:</span> {twitter || "Not added"}</p>
        <p><span className="text-gray-400">Telegram:</span> {telegram || "Not added"}</p>
        <p><span className="text-gray-400">Discord:</span> {discord || "Not added"}</p>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <p>Mint Authority: {revokeMint ? "Revoked" : "Enabled"}</p>
        <p>Freeze Authority: {revokeFreeze ? "Revoked" : "Enabled"}</p>
        <p>Metadata: {immutable ? "Immutable" : "Editable"}</p>
      </div>
    </div>
  );
}