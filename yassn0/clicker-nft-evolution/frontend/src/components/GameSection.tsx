import { NFTCard } from "./NFTCard";
import { Leaderboard } from "./Leaderboard";
import type { NFTData } from "../hooks/useFetchNFT";
import type { LeaderboardEntry } from "../hooks/useFetchLeaderboard";

interface GameSectionProps {
  nftData: NFTData;
  onClick: () => void;
  onRefresh: () => void;
  loading: boolean;
  leaderboard: LeaderboardEntry[];
  leaderboardLoading: boolean;
}

export function GameSection({
  nftData,
  onClick,
  onRefresh,
  loading,
  leaderboard,
  leaderboardLoading,
}: GameSectionProps) {
  return (
    <div className="game-layout">
      <div className="game-left">
        <NFTCard nftData={nftData} />

        <div className="game-buttons">
          <button
            onClick={onClick}
            disabled={loading}
            className="pixel-button pixel-button-xl pixel-button-primary"
          >
            {loading ? "CLICKING..." : "CLICK!"}
          </button>

          <button
            onClick={onRefresh}
            className="pixel-button pixel-button-sm pixel-button-secondary"
          >
            REFRESH
          </button>
        </div>
      </div>

      <div className="game-right">
        <Leaderboard leaderboard={leaderboard} loading={leaderboardLoading} />
      </div>
    </div>
  );
}
