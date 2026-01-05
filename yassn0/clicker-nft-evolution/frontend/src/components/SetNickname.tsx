import { useState } from "react";
import { getNickname, setNickname } from "../utils/nicknames";

interface SetNicknameProps {
  address: string;
}

export function SetNickname({ address }: SetNicknameProps) {
  const [nickname, setNicknameState] = useState(getNickname(address) || "");
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (nickname.trim().length > 0 && nickname.length <= 20) {
      setNickname(address, nickname.trim());
      setEditing(false);
    }
  };

  return (
    <div className="pixel-card mt-4">
      <p className="pixel-text pixel-text-xs mb-2">YOUR NICKNAME:</p>
      {editing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNicknameState(e.target.value)}
            maxLength={20}
            className="pixel-input flex-1"
            placeholder="Enter nickname..."
          />
          <button onClick={handleSave} className="pixel-button pixel-button-sm">
            SAVE
          </button>
          <button
            onClick={() => setEditing(false)}
            className="pixel-button pixel-button-sm pixel-button-secondary"
          >
            CANCEL
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <span className="pixel-text pixel-text-sm flex-1">
            {nickname || "No nickname set"}
          </span>
          <button
            onClick={() => setEditing(true)}
            className="pixel-button pixel-button-sm"
          >
            EDIT
          </button>
        </div>
      )}
    </div>
  );
}
