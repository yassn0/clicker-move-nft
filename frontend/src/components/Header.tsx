import { ConnectButton } from "@mysten/dapp-kit";

export function Header() {
  return (
    <header className="pixel-header flex justify-between items-center">
      <h1 className="pixel-text pixel-text-lg m-0">CLICK EVOLUTION</h1>
      <div className="wallet-connect-wrapper">
        <ConnectButton />
      </div>
    </header>
  );
}
