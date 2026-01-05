import { TIER_NAMES, TIER_IMAGES } from "../constants";
import type { NFTData } from "../hooks/useFetchNFT";

interface NFTCardProps {
  nftData: NFTData;
}

export function NFTCard({ nftData }: NFTCardProps) {
  return (
    <div className="pixel-card flex gap-6 items-center min-w-[500px] max-md:flex-col max-md:min-w-0 max-md:w-full">
      <div className="w-[200px] h-[200px] flex items-center justify-center">
        <img
          src={
            TIER_IMAGES[nftData.tier as keyof typeof TIER_IMAGES] ||
            TIER_IMAGES[0]
          }
          alt={nftData.name}
          className="w-full h-full object-cover pixel-nft-image"
        />
      </div>
      <div className="flex-1">
        <h2 className="pixel-text pixel-text-lg m-0 mb-3">
          {nftData.name.toUpperCase()}
        </h2>
        <p
          className="pixel-text pixel-text-md my-3"
          style={{ color: "var(--color-warning)" }}
        >
          {TIER_NAMES[nftData.tier] || "Unknown"}
        </p>
        <p className="pixel-text pixel-text-sm my-3">
          CLICKS: {nftData.clicks}
        </p>
        {nftData.is_goat && (
          <div className="pixel-badge mt-3">🐐 GOAT</div>
        )}
      </div>
    </div>
  );
}
