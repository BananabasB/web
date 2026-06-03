import Image from "next/image";
import { getPresence, formatPlayTime } from "@/lib/presence";
import { udShinGoPr6N } from "@/lib/fonts";
const AVATAR_URL = "https://nxapi-presence.fancy.org.uk/api/presence/resources/baas/1/16dc178262ac9b45.jpeg";

export default async function NowPlaying() {
  const data = await getPresence();

  const isOnline =
    data?.friend?.presence?.state === "ONLINE" ||
    data?.friend?.presence?.state === "PLAYING";
  const game = data?.friend?.presence?.game;

  return (
    <div className={"border-2 font-switch border-foreground " + udShinGoPr6N.className}>
      {/* top: avatar + name */}
      <div className="flex items-center gap-3 p-3 border-b-2 border-foreground">
        <div className="shrink-0 w-10 h-10 border-2 border-foreground overflow-hidden rounded-full">
          <Image
            src={AVATAR_URL}
            alt="Barnabas"
            width={40}
            height={40}
            className="w-full h-full object-cover block"
            unoptimized
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground">Barnabas</span>
          <span className="text-xs font-bold text-foreground/40">Nintendo Switch 2</span>
        </div>
      </div>

      {/* bottom: game row */}
      {isOnline && game ? (
        <a href={game.shopUri}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm text-foreground/40 hover:text-foreground transition-colors no-underline"
          aria-label={`View ${game.name} on Nintendo eShop`}
        >
      <div className="p-3">

          <div className="flex items-center gap-2.5">
            <div className="shrink-0 w-9 h-9 border border-foreground/40 overflow-hidden">
              <Image
                src={game.imageUri}
                alt={game.name}
                width={36}
                height={36}
                className="w-full h-full object-cover block"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-foreground animate-pulse shrink-0" />
                <span className="text-xs font-bold text-foreground">Online</span>
              </div>
              <p className="text-xs text-foreground/70 truncate m-0 leading-tight">
                {game.name}
              </p>
              <p className="text-xs text-foreground/40 m-0 leading-tight">
                {formatPlayTime(game.totalPlayTime)} played
              </p>
            </div>

            </div>
      </div>
          </a>
        ) : (
          <div className="flex items-center p-3 gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full border-2 border-foreground/30 shrink-0" />
            <span className="text-xs font-bold text-foreground/40">Offline</span>
          </div>
        )}
      </div>
  );
}
