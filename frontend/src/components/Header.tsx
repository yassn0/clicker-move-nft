import { ConnectButton } from "@mysten/dapp-kit";

export function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-6 bg-black/30 backdrop-blur-lg">
      <h1 className="text-3xl font-bold m-0">Clicker NFT Evolution</h1>
      <ConnectButton />
    </header>
  );
}
