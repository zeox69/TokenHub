import { Connection, clusterApiUrl } from "@solana/web3.js";

export const NETWORK = "devnet";

export const connection = new Connection(
  clusterApiUrl(NETWORK),
  "confirmed"
);

export const PLATFORM_FEE_SOL = 0.25;