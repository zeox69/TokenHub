import { Raydium } from "@raydium-io/raydium-sdk-v2";
import { connection } from "../../lib/solana";

export async function initializeRaydium(owner) {
  return await Raydium.load({
    connection,
    owner,
    disableFeatureCheck: true,
    disableLoadToken: false,
  });
}