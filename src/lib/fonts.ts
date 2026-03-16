import localFont from "next/font/local";

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
