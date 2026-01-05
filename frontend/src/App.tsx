import { useState } from "react";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { Header } from "./components/Header";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { MintSection } from "./components/MintSection";
import { GameSection } from "./components/GameSection";
import { useFetchNFT } from "./hooks/useFetchNFT";
import { useMintNFT } from "./hooks/useMintNFT";
import { useClickNFT } from "./hooks/useClickNFT";

function App() {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const [message, setMessage] = useState("");

  const { nftData, fetchNFT } = useFetchNFT(account, suiClient);

  const { mintNFT, loading: mintLoading } = useMintNFT(account, () => {
    setMessage("NFT minted successfully!");
    setTimeout(() => {
      fetchNFT();
      setMessage("");
    }, 2000);
  });

  const { clickNFT, loading: clickLoading } = useClickNFT(nftData, () => {
    setMessage("Click successful! +1");
    setTimeout(() => {
      fetchNFT();
      setMessage("");
    }, 2000);
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
        {!account ? (
          <WelcomeScreen />
        ) : !nftData ? (
          <MintSection onMint={mintNFT} loading={mintLoading} />
        ) : (
          <GameSection
            nftData={nftData}
            onClick={clickNFT}
            onRefresh={fetchNFT}
            loading={clickLoading}
          />
        )}
        {message && (
          <p className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/80 px-8 py-4 rounded-xl text-base shadow-lg animate-[slideUp_0.3s_ease]">
            {message}
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
