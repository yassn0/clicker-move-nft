import { useState } from "react";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { Header } from "./components/Header";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { MintSection } from "./components/MintSection";
import { GameSection } from "./components/GameSection";
import { useFetchNFT } from "./hooks/useFetchNFT";
import { useMintNFT } from "./hooks/useMintNFT";
import { useClickNFT } from "./hooks/useClickNFT";
import { useFetchLeaderboard } from "./hooks/useFetchLeaderboard";

function App() {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const [message, setMessage] = useState("");

  const { nftData, fetchNFT } = useFetchNFT(account, suiClient);
  const { leaderboard, loading: leaderboardLoading } =
    useFetchLeaderboard(suiClient);

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
    <div className="pixel-app">
      <Header />
      <main className="pixel-main">
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
            leaderboard={leaderboard}
            leaderboardLoading={leaderboardLoading}
          />
        )}
        {message && <div className="pixel-toast">{message}</div>}
      </main>
    </div>
  );
}

export default App;
