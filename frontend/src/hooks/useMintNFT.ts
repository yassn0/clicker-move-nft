import { useState } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME, MINT_FUNCTION } from "../constants";

export function useMintNFT(
  account: { address: string } | null,
  onSuccess?: () => void
) {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mintNFT = () => {
    if (!account) {
      setError("Please connect your wallet first!");
      return;
    }

    setLoading(true);
    setError(null);

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::${MINT_FUNCTION}`,
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
          console.error("Mint error:", err);
          setError(err.message);
          setLoading(false);
        },
      }
    );
  };

  return { mintNFT, loading, error };
}
