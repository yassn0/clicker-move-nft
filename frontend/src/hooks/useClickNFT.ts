import { useState } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import {
  PACKAGE_ID,
  MODULE_NAME,
  CLICK_FUNCTION,
  GOAT_REGISTRY_ID,
} from "../constants";
import type { NFTData } from "./useFetchNFT";

export function useClickNFT(nftData: NFTData | null, onSuccess?: () => void) {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clickNFT = () => {
    if (!nftData) {
      setError("No NFT found. Please mint one first!");
      return;
    }

    setLoading(true);
    setError(null);

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::${CLICK_FUNCTION}`,
      arguments: [tx.object(nftData.id), tx.object(GOAT_REGISTRY_ID)],
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: () => {
          setLoading(false);
          onSuccess?.();
        },
        onError: (err) => {
          console.error("Click error:", err);
          setError(err.message);
          setLoading(false);
        },
      }
    );
  };

  return { clickNFT, loading, error };
}
