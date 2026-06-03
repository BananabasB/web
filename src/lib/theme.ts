export const DEFAULT_BG = "#fffeeb";
export const DEFAULT_FG = "#3f46d0";

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = relativeLuminance(r1, g1, b1);
  const l2 = relativeLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function randomHex(): string {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}

export function randomAccessiblePair(): { bg: string; fg: string; attempts: number } {
  let bg: string, fg: string;
  let attempts = 0;
  do {
    bg = randomHex();
    fg = randomHex();
    attempts++;
  } while (contrastRatio(bg, fg) < 4.5 && attempts < 1000);
  console.log(attempts);
  return { bg, fg, attempts };
}

export function applyTheme(bg: string, fg: string) {
  const root = document.documentElement;
  root.style.setProperty("--background", bg);
  root.style.setProperty("--foreground", fg);
}

export function saveTheme(bg: string, fg: string) {
  localStorage.setItem("theme-bg", bg);
  localStorage.setItem("theme-fg", fg);
}

export function loadTheme(): { bg: string; fg: string } | null {
  const bg = localStorage.getItem("theme-bg");
  const fg = localStorage.getItem("theme-fg");
  if (bg && fg) return { bg, fg };
  return null;
}

export function clearTheme() {
  localStorage.removeItem("theme-bg");
  localStorage.removeItem("theme-fg");
}
