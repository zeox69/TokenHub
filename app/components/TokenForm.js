"use client";

import ConnectWalletButton from "./ConnectWalletButton";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import {
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createMintToCheckedInstruction,
  createSetAuthorityInstruction,
  AuthorityType,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

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

import {
  uploadFileToPinata,
  uploadMetadataToPinata,
} from "../services/pinata";

function InputBox({ icon, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-black/40 border border-white/10 px-5 py-4 hover:border-green-400/50 transition">
      <span className="text-green-400">{icon}</span>

      <input
        type={type}
        className="w-full bg-transparent outline-none text-white placeholder-gray-500 text-base"
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
      className="w-full flex items-center justify-between bg-black/40 border border-white/10 rounded-2xl p-5 hover:border-green-400/50 transition"
    >
      <div className="flex items-center gap-3 text-gray-300">
        <ShieldCheck size={20} className="text-green-400" />
        {label}
      </div>

      <div
        className={`w-12 h-6 rounded-full p-1 transition ${
          checked ? "bg-green-500" : "bg-gray-700"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition ${
            checked ? "translate-x-6" : ""
          }`}
        />
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
  imageFile,
  setImageFile,
  revokeMint,
  setRevokeMint,
  revokeFreeze,
  setRevokeFreeze,
  immutable,
  setImmutable,
}) {
  const wallet = useWallet();

  const canLaunch = tokenName && symbol && supply;

  const launchToken = async () => {
    try {
      if (!wallet.publicKey) {
        alert("Please connect your wallet first.");
        return;
      }

      let imageUrl = "";

      if (imageFile) {
        alert("Uploading logo to IPFS...");

        const uploadedImage = await uploadFileToPinata(imageFile);

        imageUrl =
          uploadedImage.url ||
          uploadedImage.gatewayUrl ||
          uploadedImage.IpfsHash ||
          uploadedImage.ipfsHash ||
          uploadedImage.cid ||
          "";
      }

      alert("Uploading metadata to IPFS...");

      const metadata = {
        name: tokenName,
        symbol: symbol,
        description: description || "",
        image: imageUrl,
        external_url: website || "",
                attributes: [
          { trait_type: "Website", value: website || "Not added" },
          { trait_type: "Twitter", value: twitter || "Not added" },
          { trait_type: "Telegram", value: telegram || "Not added" },
          { trait_type: "Discord", value: discord || "Not added" },
        ],

        properties: {
          files: imageUrl
            ? [
                {
                  uri: imageUrl,
                  type: imageFile?.type || "image/png",
                },
              ]
            : [],
          category: "image",
        },
      };

      const uploadedMetadata = await uploadMetadataToPinata(metadata);

      console.log("Uploaded metadata response:", uploadedMetadata);

      if (!uploadedMetadata) {
        throw new Error("Metadata upload failed.");
      }

      const metadataUrl =
  uploadedMetadata.gateway ||
  uploadedMetadata.gatewayUrl ||
  uploadedMetadata.url ||
  uploadedMetadata.cid ||
  "";

      console.log("Metadata URL:", metadataUrl);

      if (!metadata.name || metadata.name.trim() === "") {
        throw new Error("Token name is missing.");
      }

      if (!metadata.symbol || metadata.symbol.trim() === "") {
        throw new Error("Token symbol is missing.");
      }

      if (imageFile && (!metadata.image || metadata.image.trim() === "")) {
        throw new Error("Token logo was not uploaded.");
      }

      alert("✅ Metadata uploaded successfully!");

      const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
      );
const balance = await connection.getBalance(wallet.publicKey);

console.log("Wallet:", wallet.publicKey.toString());
console.log("Balance:", balance / LAMPORTS_PER_SOL, "SOL");


      const feeReceiver = new PublicKey("9H3Tpr8ApAPuTmRt73aMaxxmmVM75hCgELvpv9m65bcw");
const feeAmount = 0.25 * LAMPORTS_PER_SOL;

console.log("Fee in lamports:", feeAmount);
console.log("Fee in SOL:", feeAmount / LAMPORTS_PER_SOL);

      const mintKeypair = Keypair.generate();

      const lamports = await connection.getMinimumBalanceForRentExemption(
        MINT_SIZE
      );

      const tokenATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        wallet.publicKey
      );

      const transaction = new Transaction();

      transaction.add(
  SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: feeReceiver,
    lamports: feeAmount,
  })
);

      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        })
      );
            transaction.add(
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Number(decimals || 9),
          wallet.publicKey,
          wallet.publicKey
        )
      );
      transaction.add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          tokenATA,
          wallet.publicKey,
          mintKeypair.publicKey
        )
      );

      transaction.add(
        createMintToCheckedInstruction(
  mintKeypair.publicKey,
  tokenATA,
  wallet.publicKey,
  BigInt(supply) * BigInt(10) ** BigInt(Number(decimals || 9)),
  Number(decimals || 9)
)
      );
if (revokeMint) {
  transaction.add(
    createSetAuthorityInstruction(
      mintKeypair.publicKey,
      wallet.publicKey,
      AuthorityType.MintTokens,
      null
    )
  );
}

if (revokeFreeze) {
  transaction.add(
    createSetAuthorityInstruction(
      mintKeypair.publicKey,
      wallet.publicKey,
      AuthorityType.FreezeAccount,
      null
    )
  );
}
      const latestBlockhash = await connection.getLatestBlockhash("confirmed");

      transaction.recentBlockhash = latestBlockhash.blockhash;
      transaction.feePayer = wallet.publicKey;

      transaction.partialSign(mintKeypair);
console.log("Wallet:", wallet.publicKey.toString());
console.log("Mint:", mintKeypair.publicKey.toString());
console.log("Token ATA:", tokenATA.toString());
console.log("Instructions:", transaction.instructions);
      const signedTx = await wallet.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signedTx.serialize());
console.log("TXID:", txid);
console.log("Explorer:", `https://explorer.solana.com/tx/${txid}?cluster=devnet`);
      await connection.confirmTransaction(
        {
          signature: txid,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed"
      );

      alert(
        `Token created successfully!

Mint Address:
${mintKeypair.publicKey.toString()}

Metadata URI:
${metadataUrl}

Transaction:
${txid}`
      );
    } catch (error) {
      console.error(error);
      alert(error.message || "Error creating token. Open browser console.");
    }
  };

  return (
    <section className="w-full">
      <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center">
              <Coins size={30} className="text-green-400" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                Create Your Token
              </h2>

              <p className="text-gray-400 mt-1">
                Launch your Solana token in minutes
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">

                  <label className="border-2 border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-green-400/60 transition bg-black/30">
            {image ? (
              <img
                src={image}
                alt="Token logo preview"
                className="w-28 h-28 rounded-full object-cover mb-4 border border-green-400"
              />
            ) : (
              <Upload size={52} className="text-green-400 mb-4" />
            )}

            <span className="text-white font-semibold text-lg">
              Upload Token Logo
            </span>
            <span className="text-gray-500 text-sm mt-2">
              PNG • JPG • WEBP
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  setImageFile(file);
                  setImage(URL.createObjectURL(file));
                }
              }}
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputBox
              icon={<Coins size={20} />}
              placeholder="Token Name"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />

            <InputBox
              icon={<BadgeDollarSign size={20} />}
              placeholder="Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />

            <InputBox
              icon={<BadgeDollarSign size={20} />}
              placeholder="Supply"
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
            />

            <InputBox
              icon={<Coins size={20} />}
              placeholder="Decimals"
              type="number"
              value={decimals}
              onChange={(e) => setDecimals(e.target.value)}
            />
          </div>

          <div className="flex gap-4 rounded-2xl bg-black/40 border border-white/10 px-5 py-4 hover:border-green-400/50 transition">
            <FileText size={20} className="text-green-400 mt-1" />

            <textarea
              className="w-full bg-transparent outline-none text-white placeholder-gray-500 min-h-32 resize-none"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputBox
              icon={<Globe size={20} />}
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

            <InputBox
              icon={<MessageCircle size={20} />}
              placeholder="Twitter X"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />

            <InputBox
              icon={<Send size={20} />}
              placeholder="Telegram"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />

            <InputBox
              icon={<MessageCircle size={20} />}
              placeholder="Discord"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Toggle
              label="Revoke Mint Authority"
              checked={revokeMint}
              onChange={setRevokeMint}
            />

            <Toggle
              label="Revoke Freeze Authority"
              checked={revokeFreeze}
              onChange={setRevokeFreeze}
            />

            <Toggle
              label="Immutable Metadata"
              checked={immutable}
              onChange={setImmutable}
            />
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-lg">Creation Fee</span>

              <span className="text-green-400 font-bold text-2xl">
                0.25 SOL
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Fee is required before launching the token.
            </p>
          </div>

          <ConnectWalletButton />

          <button
            disabled={!canLaunch}
            onClick={launchToken}
            className={`w-full flex items-center justify-center gap-2 font-bold py-5 rounded-2xl transition text-lg ${
              canLaunch
                ? "bg-green-500 hover:bg-green-400 text-black shadow-lg shadow-green-500/20"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Rocket size={22} />
            Launch Token
          </button>
        </div>
      </div>
    </section>
  );
}