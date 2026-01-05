import { TIER_NAMES, TIER_IMAGES } from "../constants";
import type { NFTData } from "../hooks/useFetchNFT";

interface NFTCardProps {
  nftData: NFTData;
}

export function NFTCard({ nftData }: NFTCardProps) {
  return (
    <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 shadow-2xl flex gap-8 items-center min-w-[500px] max-md:flex-col max-md:min-w-0 max-md:w-full">
      <div className="w-[200px] h-[200px] rounded-2xl overflow-hidden bg-white/10 flex items-center justify-center">
        <img
          src={
            TIER_IMAGES[nftData.tier as keyof typeof TIER_IMAGES] ||
            TIER_IMAGES[0]
          }
          alt={nftData.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-4xl font-bold m-0 mb-2">{nftData.name}</h2>
        <p className="text-2xl font-bold text-yellow-400 my-2">
          {TIER_NAMES[nftData.tier] || "Unknown"}
        </p>
        <p className="text-xl my-2">Clicks: {nftData.clicks}</p>
        {nftData.is_goat && (
          <p className="inline-block bg-gradient-to-r from-pink-400 to-rose-500 px-4 py-2 rounded-full font-bold text-lg mt-2 animate-pulse-slow">
            GOAT
          </p>
        )}
      </div>
    </div>
  );
}
