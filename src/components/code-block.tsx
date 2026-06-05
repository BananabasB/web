"use client"
import React, { useRef, useState, useEffect } from "react";
import { languages, type LanguageInfo } from "../lib/languages";
import Button from "./button";

function getLanguageInfo(lang: string): LanguageInfo | undefined {
  // Check direct key match
  if (languages[lang]) return languages[lang];

  // Check abbreviations
  const langLower = lang.toLowerCase();
  return Object.values(languages).find(l =>
    l.abbreviation.map(a => a.toLowerCase()).includes(langLower)
  );
}

const AI_SERVICES = [
  {
    name: "ChatGPT",
    buildUrl: (code: string) => `https://chatgpt.com/?q=${encodeURIComponent(code)}`,
  },
  {
    name: "Claude",
    buildUrl: (code: string) => `https://claude.ai/new?q=${encodeURIComponent(code)}`,
  },
  {
    name: "Scira",
    buildUrl: (code: string) => `https://scira.ai/?q=${encodeURIComponent(code)}`,
  },
];

export function CodeBlock({ children, ...props }: any) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLPreElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldTruncate, setShouldTruncate] = useState(false);

  const codeProps = children.props;
  const language = codeProps.className?.replace("language-", "") || "code";
  const languageInfo = getLanguageInfo(language);
  const languageName = languageInfo?.name || language;

  // Extract the actual code content
  const codeContent = children.props.children;

  useEffect(() => {
    if (contentRef.current) {
      // If the content is taller than 400px, we should offer truncation
      if (contentRef.current.scrollHeight > 400) {
        setShouldTruncate(true);
      }
    }
  }, [codeContent]);

  const handleOpenInAI = (service: typeof AI_SERVICES[0]) => {
    const url = service.buildUrl(codeContent);
    window.open(url, "_blank");
    popoverRef.current?.hidePopover();
  };

  const handleTogglePopover = () => {
    if (popoverRef.current?.matches(":popover-open")) {
      popoverRef.current?.hidePopover();
    } else {
      popoverRef.current?.showPopover();
    }
  };

  const isTruncated = shouldTruncate && !isExpanded;

  return (
    <div className="bg-mix corner-smooth overflow-hidden rounded-lg border-2 border-foreground relative">
      <div className="flex items-center justify-between px-4 py-2 bg-background border-b-2">
        <span className="text-xs font-bold">
          {languageName}
        </span>

        {/* Popover Menu with Anchor Positioning */}
        <div className="[anchor-name:--button-anchor]">
          <Button
            ref={buttonRef}
            onClick={handleTogglePopover}
            className="text-xs border-b-2! active:mt-0! px-2 py-1 rounded hover:bg-foreground/10 transition-colors"
            aria-label="Open in AI service"
          >
            Open in...
          </Button>

          <div
            ref={popoverRef}
            popover="auto"
            className="bg-background border-2 border-foreground rounded-lg [position-anchor:--button-anchor] absolute [top:anchor(bottom)] [left:anchor(right)] [translate:-100%_0.4rem]"
          >
            {AI_SERVICES.map((service) => (
              <button
                key={service.name}
                onClick={() => handleOpenInAI(service)}
                className="w-full border-foreground text-foreground text-left font-semibold px-3 border-b-2 last:border-b-0 py-2 text-xs hover:bg-foreground/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div 
        className={`relative transition-[max-height] duration-300 ease-in-out overflow-hidden ${
          isTruncated ? "max-h-[400px]" : "max-h-none"
        }`}
      >
        <pre {...props} ref={contentRef} className="pt-4 px-4 pb-0 mb-0">
          {children}
        </pre>

        {isTruncated && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-4">
            <Button
              onClick={() => setIsExpanded(true)}
              className="text-xs px-4 bg-background py-1.5"
            >
              Show more
            </Button>
          </div>
        )}
      </div>

      {isExpanded && shouldTruncate && (
        <div className="flex justify-center pb-4 border-t-2 border-foreground/10 pt-4 bg-background/50">
          <Button
            onClick={() => setIsExpanded(false)}
            className="text-xs px-4 bg-background py-1.5"
          >
            Show less
          </Button>
        </div>
      )}
    </div>
  );
}
