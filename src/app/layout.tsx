import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { IBM_Plex_Sans as Geist } from "next/font/google";
import { makeSans, googleSansCode } from "@/lib/fonts";
import Footer from "@/components/footer";
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bananabas",
  description: "bananabas' corner of the web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <script dangerouslySetInnerHTML={{ __html: `
        const bg = localStorage.getItem('theme-bg');
        const fg = localStorage.getItem('theme-fg');
        if (bg && fg) {
          document.documentElement.style.setProperty('--background', bg);
          document.documentElement.style.setProperty('--foreground', fg);
        }
      ` }} />
    </head>
      <body className={`${makeSans.variable} ${googleSansCode.variable} ${geist.variable} ${geist.className} antialiased`}>
        {/* Skip link for keyboard/screen reader users */}
        <a href="#content" className="skip-link">Skip to content</a>

        <header className="relative">
          <Navbar />
        </header>
        <main id="content" className="bg-background relative z-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
