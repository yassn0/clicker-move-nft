interface MintSectionProps {
  onMint: () => void;
  loading: boolean;
}

export function MintSection({ onMint, loading }: MintSectionProps) {
  return (
    <div className="pixel-card text-center max-w-2xl">
      <h2 className="pixel-text pixel-text-md mb-6">
        YOU DON'T HAVE A CLICKER NFT YET
      </h2>
      <div className="text-6xl mb-8">🖱️</div>
      <button
        onClick={onMint}
        disabled={loading}
        className="pixel-button pixel-button-lg pixel-button-accent"
      >
        {loading ? "MINTING..." : "MINT YOUR NFT"}
      </button>
    </div>
  );
}
