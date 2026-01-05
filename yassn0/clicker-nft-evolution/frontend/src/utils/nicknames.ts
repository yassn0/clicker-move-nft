const NICKNAME_KEY = 'clicker_nicknames';

export function getNickname(address: string): string | null {
  try {
    const nicknames = JSON.parse(localStorage.getItem(NICKNAME_KEY) || '{}');
    return nicknames[address] || null;
  } catch (error) {
    console.error('Error getting nickname:', error);
    return null;
  }
}

export function setNickname(address: string, nickname: string): void {
  try {
    const nicknames = JSON.parse(localStorage.getItem(NICKNAME_KEY) || '{}');
    nicknames[address] = nickname.trim();
    localStorage.setItem(NICKNAME_KEY, JSON.stringify(nicknames));
  } catch (error) {
    console.error('Error setting nickname:', error);
  }
}

export function displayName(address: string): string {
  const nickname = getNickname(address);
  if (nickname) return nickname;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
