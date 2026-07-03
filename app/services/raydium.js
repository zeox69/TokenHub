import {
  Raydium,
  TxVersion,
  CREATE_CPMM_POOL_PROGRAM,
  CREATE_CPMM_POOL_FEE_ACC,
  getCpmmPdaAmmConfigId,
} from "@raydium-io/raydium-sdk-v2";

import { NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { connection } from "../lib/solana";

export async function initRaydium(wallet) {
  if (!wallet?.publicKey) throw new Error("Wallet not connected");

  return await Raydium.load({
    connection,
    owner: wallet.publicKey,
    signAllTransactions: wallet.signAllTransactions,
    cluster: "devnet",
    disableFeatureCheck: true,
    disableLoadToken: false,
    blockhashCommitment: "confirmed",
  });
}

export async function getWalletTokenBalance(wallet, mint) {
  console.log("Searching wallet tokens for mint:", mint);

  const accounts = await connection.getParsedTokenAccountsByOwner(
    wallet.publicKey,
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  const found = accounts.value.find((account) => {
    const info = account.account.data.parsed.info;
    return info.mint === mint;
  });

  if (!found) {
    return 0;
  }

  return Number(found.account.data.parsed.info.tokenAmount.amount);
}
export async function createCpmmPool(wallet, tokenMint, tokenAmount, solAmount) {
  const raydium = await initRaydium(wallet);

  const tokenInfo = await raydium.token.getTokenInfo(tokenMint);

  const mintA = {
    address: NATIVE_MINT.toBase58(),
    programId: TOKEN_PROGRAM_ID.toBase58(),
    decimals: 9,
  };

  const mintB = {
    address: tokenInfo.address,
    programId: tokenInfo.programId,
    decimals: tokenInfo.decimals,
  };

  const feeConfigs = await raydium.api.getCpmmConfigs();

  feeConfigs.forEach((config) => {
    config.id = getCpmmPdaAmmConfigId(
      CREATE_CPMM_POOL_PROGRAM,
      config.index
    ).publicKey.toBase58();
  });

  const mintAAmount = new BN(
    Math.floor(Number(solAmount) * 10 ** 9).toString()
  );

  const mintBAmount = new BN(
    Math.floor(Number(tokenAmount) * 10 ** tokenInfo.decimals).toString()
  );

  const { execute, extInfo } = await raydium.cpmm.createPool({
    programId: CREATE_CPMM_POOL_PROGRAM,
    poolFeeAccount: CREATE_CPMM_POOL_FEE_ACC,
    mintA,
    mintB,
    mintAAmount,
    mintBAmount,
    startTime: new BN(0),
    feeConfig: feeConfigs[0],
    associatedOnly: true,
    ownerInfo: {
      useSOLBalance: true,
      feePayer: wallet.publicKey,
    },
    txVersion: TxVersion.V0,
  });

  console.log("Before execute");

  const result = await execute({
    sendAndConfirm: true,
  });

  console.log("Execute result:", result);
console.log("FULL extInfo JSON:", JSON.stringify(extInfo, null, 2));
console.log("FULL address JSON:", JSON.stringify(extInfo.address, null, 2));

  localStorage.setItem(
  "createdPoolData",
  JSON.stringify({
    poolId: extInfo.address.poolId.toBase58(),
    lpMint: extInfo.address.lpMint.toBase58(),
    vaultA: extInfo.address.vaultA.toBase58(),
    vaultB: extInfo.address.vaultB.toBase58(),
    tokenMint,
  })
);

  return {
    txId: result.txId,
    poolId:
      extInfo?.address?.poolId?.toString?.() ||
      extInfo?.address?.id?.toString?.() ||
      extInfo?.poolId?.toString?.() ||
      "Pool created",
  };
}

export async function removeCpmmLiquidity(wallet, poolId, percent) {
  await initRaydium(wallet);

  if (!poolId) {
    throw new Error("Pool ID is required");
  }

  const savedPool = JSON.parse(localStorage.getItem("createdPoolData"));

  if (!savedPool) {
    throw new Error("No saved pool data found. Create liquidity first.");
  }

  console.log("Using saved pool data:", savedPool);
console.log("Saved LP Mint:", savedPool.lpMint);

if (!savedPool.lpMint) {
  throw new Error("LP mint is missing. Create liquidity again after saving new code.");
}
  const lpBalance = await getWalletTokenBalance(wallet, savedPool.lpMint);

  console.log("LP Balance:", lpBalance);

  if (lpBalance <= 0) {
    throw new Error("No LP tokens found in your wallet for this pool.");
  }

  const lpAmount = Math.floor((lpBalance * Number(percent)) / 100);

  console.log("LP Amount:", lpAmount);

  throw new Error(
    "LP balance found. Next step: execute remove liquidity transaction."
  );
}