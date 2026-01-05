import type { LeaderboardEntry } from "../hooks/useFetchLeaderboard";
import { displayName } from "../utils/nicknames";

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
}

export function Leaderboard({ leaderboard, loading }: LeaderboardProps) {
  return (
    <div className="pixel-card" style={{ minWidth: "350px" }}>
      <div className="text-center mb-6">
        <h2 className="pixel-text pixel-text-md" style={{ color: "var(--color-accent)" }}>
          TOP 10 GOAT
        </h2>
      </div>

      {loading ? (
        <div className="text-center pixel-text pixel-text-xs">
          LOADING...
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="text-center pixel-text pixel-text-xs">
          NO GOATS YET!
          <p className="mt-4 pixel-text-xs" style={{ color: "var(--color-text-secondary)" }}>
          </p>
        </div>
      ) : (
        <div>
          {leaderboard.map((entry) => (
            <div key={entry.address} className="pixel-leaderboard-entry">
              <span className="rank">#{entry.rank}</span>
              <span className="address">{displayName(entry.address)}</span>
              <span className="clicks">{entry.clicks}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
