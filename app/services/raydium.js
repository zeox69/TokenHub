import { Raydium } from "@raydium-io/raydium-sdk-v2";
import { connection } from "../lib/solana";

export async function initRaydium(owner) {
  if (!owner) {
    throw new Error("Wallet not connected");
  }

  const raydium = await Raydium.load({
    connection,
    owner,
    disableFeatureCheck: true,
    disableLoadToken: false,
  });

  return raydium;
}