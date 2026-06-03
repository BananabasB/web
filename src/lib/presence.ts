export interface PresenceGame {
  name: string;
  imageUri: string;
  shopUri: string;
  totalPlayTime: number; // minutes
  firstPlayedAt: number;
  sysDescription: string;
}

export interface PresenceData {
  friend: {
    name: string;
    presence: {
      state: "ONLINE" | "OFFLINE" | "PLAYING" | string;
      updatedAt: number;
      logoutAt: number;
      game?: PresenceGame;
    };
  };
  title?: {
    since: string;
  };
}

export async function getPresence(): Promise<PresenceData | null> {
  try {
    const res = await fetch(
      "https://nxapi-presence.fancy.org.uk/api/presence/38c9a2550672b045?include-splatoon3=1",
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export function formatPlayTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours >= 1000) return `${(hours / 1000).toFixed(1)}k hrs`;
  return `${hours} hrs`;
}

export function formatSince(isoString: string): string {
  const since = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - since.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}
