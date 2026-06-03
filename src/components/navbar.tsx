"use client"
import Link from "next/link";
import { makeSans } from "@/lib/fonts";
import { motion } from "motion/react";
import { useState } from "react";

export default function Navbar() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);

  const handleHover = () => {
    if (!canAnimate || isAnimating) return;

    setIsAnimating(true);
    setCanAnimate(false);

    // 1s cooldown before next animation can trigger
    setTimeout(() => {
      setIsAnimating(false);
      setCanAnimate(true);
    }, 1000);
  };

  return (
    <nav className="border-b-2 border-foreground justify-between items-center px-4 py-4 flex flex-row">
      <Link href="/">
        <motion.div
          className="h-full"
          onHoverStart={handleHover}
          animate={isAnimating ? { y: -80 } : { y: 0 }}
          transition={isAnimating ? { duration: 0.2, ease: "easeInOut" } : { duration: 0 }}
        >
          <h1 className={`text-7xl translate-x-1 translate-y-2 font-black ${makeSans.className}`}>bananabas</h1>
          <p
            className={`text-7xl absolute translate-x-1 translate-y-4 font-black ${makeSans.className}`}
            aria-hidden="true"
          >
            bananabas
          </p>
        </motion.div>
      </Link>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link href="/blog">Blog</Link>
        </li>
        <li className="navbar-item">
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
