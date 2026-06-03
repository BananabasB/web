"use client";
import { useEffect } from "react";
import { makeSans } from "@/lib/fonts";
import { randomAccessiblePair, applyTheme, saveTheme, loadTheme, clearTheme, DEFAULT_BG, DEFAULT_FG } from "@/lib/theme";
import Button from "./button";
export default function Footer() {
  useEffect(() => {
    const saved = loadTheme();
    if (saved) applyTheme(saved.bg, saved.fg);
  }, []);

  const handleRandomise = () => {
    const { bg, fg } = randomAccessiblePair();
    applyTheme(bg, fg);
    saveTheme(bg, fg);
  };

  const handleReset = () => {
    applyTheme(DEFAULT_BG, DEFAULT_FG);
    clearTheme();
  };

  return (
    <footer className="border-t-2 border-foreground mt-12 px-6 py-4 flex flex-row justify-between items-center">
      <p className="text-xs uppercase tracking-widest font-bold opacity-60">bananabas</p>
      <div className="flex flex-row gap-3">
        <Button onClick={handleRandomise} className={`text-xs font-bold uppercase tracking-widest border-2 border-foreground px-3 py-1 hover:opacity-60 transition-opacity ${makeSans.className}`}>
          randomise
        </Button>
        <Button onClick={handleReset} className={`text-xs font-bold uppercase tracking-widest border-2 border-foreground px-3 py-1 hover:opacity-60 transition-opacity ${makeSans.className}`}>
          reset
        </Button>
      </div>
    </footer>
  );
}
