import { useState, useEffect } from "react";
import { SuiClient } from "@mysten/sui/client";
import { PACKAGE_ID, MODULE_NAME } from "../constants";

export interface NFTData {
  id: string;
  clicks: string;
  tier: number;
  name: string;
  image_url: string;
  is_goat: boolean;
}

export function useFetchNFT(
  account: { address: string } | null,
  suiClient: SuiClient
) {
  const [nftData, setNftData] = useState<NFTData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchNFT = async () => {
    if (!account?.address) {
      setNftData(null);
      return;
    }

    setLoading(true);
    try {
      const objects = await suiClient.getOwnedObjects({
        owner: account.address,
        filter: {
          StructType: `${PACKAGE_ID}::${MODULE_NAME}::ClickerNFT`,
        },
        options: {
          showContent: true,
          showType: true,
        },
      });

      if (objects.data.length > 0) {
        const nft = objects.data[0];
        const content = nft.data?.content as any;
        if (content?.fields) {
          setNftData({
            id: nft.data?.objectId || "",
            clicks: content.fields.clicks,
            tier: content.fields.tier,
            name: content.fields.name,
            image_url: content.fields.image_url,
            is_goat: content.fields.is_goat,
          });
        }
      } else {
        setNftData(null);
      }
    } catch (error) {
      console.error("Error fetching NFT:", error);
      setNftData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFT();
  }, [account?.address]);

  return { nftData, fetchNFT, loading };
}
