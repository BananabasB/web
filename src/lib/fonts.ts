import localFont from "next/font/local";
import { Google_Sans_Code } from "next/font/google";

export const makeSans = localFont({
  src: [
    { path: "../../public/fonts/MakeSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/MakeSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/MakeSans-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/MakeSans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/MakeSans-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../../public/fonts/MakeSans-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-make-sans",
  display: "swap",
});

export const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-google-sans-code",
  display: "swap",
});
export const udShinGoPr6N = localFont({
  src: [
    { path: "../../public/fonts/UDShinGoPr6N-Bold.otf", weight: "700", style: "normal" }
  ],
  variable: "--font-switch",
  display: "swap",
})
