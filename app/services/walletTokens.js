import { PublicKey } from "@solana/web3.js";
import { connection } from "../lib/solana";

const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export async function getWalletTokens(publicKey) {
  if (!publicKey) return [];

  const accounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  });

  return accounts.value.map((item) => {
    const info = item.account.data.parsed.info;

    return {
  mint: info.mint,
  amount: Number(info.tokenAmount.uiAmountString).toLocaleString(),
  decimals: info.tokenAmount.decimals,
};
  });
}
