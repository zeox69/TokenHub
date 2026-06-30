"use client";

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function ConnectWalletButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-500 !rounded-xl !h-12 !px-6 !font-semibold" />
  );
}