"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heading } from "@/lib/posts";
import { makeSans } from "@/lib/fonts";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0% -80% 0%", // Adjust based on scroll-mt and viewport
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div>
      <h2 className={`text-xs uppercase tracking-widest font-bold text-foreground mb-3 ${makeSans.className}`}>
        contents
      </h2>
      <nav aria-label="Table of contents">
        <ul className="flex flex-col gap-2">
          {headings.map((heading) => (
            <li
              key={heading.slug}
              style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
              className="relative"
            >
              {activeId === heading.slug && (
                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-foreground rounded-full" />
              )}
              <Link
                href={`#${heading.slug}`}
                className={`text-sm transition-all duration-200 ${
                  activeId === heading.slug
                    ? "text-foreground font-bold opacity-100"
                    : "text-foreground opacity-60 hover:opacity-100"
                }`}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
