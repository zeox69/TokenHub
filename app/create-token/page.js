"use client";

import { useState } from "react";
import TokenForm from "../components/TokenForm";
import TokenPreview from "../components/TokenPreview";

export default function CreateTokenPage() {
  const [tokenName, setTokenName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [decimals, setDecimals] = useState("9");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [image, setImage] = useState(null);

  const [revokeMint, setRevokeMint] = useState(true);
  const [revokeFreeze, setRevokeFreeze] = useState(true);
  const [immutable, setImmutable] = useState(false);

  return (
    <main className="min-h-screen bg-[#020617] text-white px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold">Create Solana Token</h1>
          <p className="text-gray-400 mt-3 text-lg">
            Launch your own SPL token in just a few clicks.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <TokenForm
              tokenName={tokenName}
              setTokenName={setTokenName}
              symbol={symbol}
              setSymbol={setSymbol}
              supply={supply}
              setSupply={setSupply}
              decimals={decimals}
              setDecimals={setDecimals}
              description={description}
              setDescription={setDescription}
              website={website}
              setWebsite={setWebsite}
              twitter={twitter}
              setTwitter={setTwitter}
              telegram={telegram}
              setTelegram={setTelegram}
              discord={discord}
              setDiscord={setDiscord}
              image={image}
              setImage={setImage}
              revokeMint={revokeMint}
              setRevokeMint={setRevokeMint}
              revokeFreeze={revokeFreeze}
              setRevokeFreeze={setRevokeFreeze}
              immutable={immutable}
              setImmutable={setImmutable}
            />
          </div>

          <TokenPreview
            tokenName={tokenName}
            symbol={symbol}
            supply={supply}
            decimals={decimals}
            description={description}
            website={website}
            twitter={twitter}
            telegram={telegram}
            discord={discord}
            image={image}
            revokeMint={revokeMint}
            revokeFreeze={revokeFreeze}
            immutable={immutable}
          />
        </div>
      </div>
    </main>
  );
}