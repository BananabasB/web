"use client";
import { useSyncExternalStore, useState } from "react";
import { SiBluesky, SiWhatsapp } from "react-icons/si";
import { LuLink as Link } from "react-icons/lu";
import Button from "@/components/button";

type Props = {
  title: string;
  url: string;
};

const emptySubscribe = () => () => {};

function useCanShare() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return !!navigator.share && !!navigator.canShare({ title: "", url: "" }) && !/Firefox/i.test(navigator.userAgent);
      } catch {
        return false;
      }
    },
    () => false
  );
}

export default function ShareButton({ title, url }: Props) {
  const canShare = useCanShare();
  const [copied, setCopied] = useState(false);

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {}
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (canShare) {
    return (
      <Button onClick={handleNativeShare}>
        share
      </Button>
    );
  }

  return (
    <div className="flex flex-row gap-3 items-center">
      <a href={`https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} — ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="share on bluesky">
        <SiBluesky size={18} />
      </a>
      <a href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="share on whatsapp">
        <SiWhatsapp size={18} />
      </a>
      <button onClick={handleCopy} aria-label="copy link">
        <Link size={18} />
        {copied && <span className="text-xs ml-1">copied!</span>}
      </button>
    </div>
  );
}
