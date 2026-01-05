import { NFTCard } from "./NFTCard";
import type { NFTData } from "../hooks/useFetchNFT";

interface GameSectionProps {
  nftData: NFTData;
  onClick: () => void;
  onRefresh: () => void;
  loading: boolean;
}

export function GameSection({
  nftData,
  onClick,
  onRefresh,
  loading,
}: GameSectionProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <NFTCard nftData={nftData} />

      <button
        onClick={onClick}
        disabled={loading}
        className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold text-2xl px-16 py-8 rounded-xl mt-4 hover:scale-105 hover:shadow-[0_15px_30px_rgba(79,172,254,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed max-md:text-xl max-md:px-12 max-md:py-6"
      >
        {loading ? "Clicking..." : "CLICK!"}
      </button>

      <button
        onClick={onRefresh}
        className="bg-white/20 text-white font-bold text-sm px-4 py-2 rounded-xl mt-2 hover:bg-white/30 transition-colors"
      >
        Refresh
      </button>
    </div>
  );
}
