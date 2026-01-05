import type { LeaderboardEntry } from "../hooks/useFetchLeaderboard";

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
}

function shortenAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function Leaderboard({ leaderboard, loading }: LeaderboardProps) {
  return (
    <div className="pixel-card" style={{ minWidth: "350px" }}>
      <div className="text-center mb-6">
        <h2 className="pixel-text pixel-text-md" style={{ color: "var(--color-accent)" }}>
          🐐 TOP 10 GOAT 🐐
        </h2>
      </div>

      {loading ? (
        <div className="text-center pixel-text pixel-text-xs">
          LOADING...
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="text-center pixel-text pixel-text-xs">
          NO GOATS YET!
          <div className="mt-4 text-4xl">🎯</div>
          <p className="mt-4 pixel-text-xs" style={{ color: "var(--color-text-secondary)" }}>
            BE THE FIRST TO REACH LEGEND!
          </p>
        </div>
      ) : (
        <div>
          {leaderboard.map((entry) => (
            <div key={entry.address} className="pixel-leaderboard-entry">
              <span className="rank">#{entry.rank}</span>
              <span className="address">{shortenAddress(entry.address)}</span>
              <span className="clicks">{entry.clicks}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
