interface MintSectionProps {
  onMint: () => void;
  loading: boolean;
}

export function MintSection({ onMint, loading }: MintSectionProps) {
  return (
    <div className="text-center bg-white/10 backdrop-blur-lg px-12 py-12 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-semibold mb-4">
        You don't have a Clicker NFT yet
      </h2>
      <button
        onClick={onMint}
        disabled={loading}
        className="bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold text-xl px-8 py-4 rounded-xl hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(245,87,108,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Minting..." : "Mint Your NFT"}
      </button>
    </div>
  );
}
