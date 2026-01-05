import { useState, useEffect } from "react";
import type { SuiClient } from "@mysten/sui/client";
import { GOAT_REGISTRY_ID, PACKAGE_ID, MODULE_NAME } from "../constants";

export interface LeaderboardEntry {
  rank: number;
  address: string;
  clicks: string;
  name: string;
}

export function useFetchLeaderboard(suiClient: SuiClient) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // Get the GOATRegistry object
      const registry = await suiClient.getObject({
        id: GOAT_REGISTRY_ID,
        options: { showContent: true },
      });

      if (!registry.data || !registry.data.content || registry.data.content.dataType !== "moveObject") {
        setLeaderboard([]);
        setLoading(false);
        return;
      }

      // Extract GOAT addresses
      const fields = registry.data.content.fields as any;
      const goatAddresses = fields.goat_addresses || [];

      if (goatAddresses.length === 0) {
        setLeaderboard([]);
        setLoading(false);
        return;
      }

      // Fetch NFT data for each GOAT (top 10)
      const entries = await Promise.all(
        goatAddresses.slice(0, 10).map(async (addr: string, index: number) => {
          try {
            // Get all NFTs owned by this address
            const nfts = await suiClient.getOwnedObjects({
              owner: addr,
              filter: {
                StructType: `${PACKAGE_ID}::${MODULE_NAME}::ClickerNFT`,
              },
              options: { showContent: true },
            });

            if (nfts.data.length > 0 && nfts.data[0].data) {
              const nftContent = nfts.data[0].data.content;
              if (nftContent && nftContent.dataType === "moveObject") {
                const nftFields = nftContent.fields as any;
                return {
                  rank: index + 1,
                  address: addr,
                  clicks: nftFields.clicks?.toString() || "0",
                  name: nftFields.name || "Unknown",
                };
              }
            }
            return null;
          } catch (err) {
            console.error(`Error fetching NFT for ${addr}:`, err);
            return null;
          }
        })
      );

      // Filter out null entries and update state
      const validEntries = entries.filter(
        (e): e is LeaderboardEntry => e !== null
      );
      setLeaderboard(validEntries);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, [suiClient]);

  return { leaderboard, loading, fetchLeaderboard };
}
