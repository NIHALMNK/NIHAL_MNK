"use client";

import * as React from "react";
import { BlogHeading } from "@/types/blog";

interface ReadingIndicatorProps {
  headings: BlogHeading[];
  articleId?: string;
}

export function ReadingIndicator({ headings, articleId = "article-body" }: ReadingIndicatorProps) {
  const [activeHeadingText, setActiveHeadingText] = React.useState<string>("");
  const [scrollProgress, setScrollProgress] = React.useState<number>(0);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  // Set initial active heading when headings update
  React.useEffect(() => {
    if (headings.length > 0 && !activeHeadingText) {
      setActiveHeadingText(headings[0].text);
    }
  }, [headings, activeHeadingText]);

  // Scroll Progress Calculation (0% -> 100%)
  React.useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const articleEl = document.getElementById(articleId);
        if (!articleEl) return;

        const rect = articleEl.getBoundingClientRect();
        const articleTop = window.scrollY + rect.top;
        const articleHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Show indicator once user scrolls near the article
        const currentScroll = window.scrollY;
        if (currentScroll > 150) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }

        const totalScrollableDistance = articleHeight - windowHeight + 100;
        if (totalScrollableDistance <= 0) {
          setScrollProgress(100);
          return;
        }

        const scrollDistance = currentScroll - articleTop + windowHeight * 0.3;
        const progress = Math.min(
          100,
          Math.max(0, (scrollDistance / totalScrollableDistance) * 100)
        );

        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [articleId]);

  // IntersectionObserver for Heading Tracking
  React.useEffect(() => {
    if (headings.length === 0) return;

    const headingElements: HTMLElement[] = [];
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) headingElements.push(el);
    });

    if (headingElements.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedHeading = headings.find((h) => h.id === entry.target.id);
          if (matchedHeading) {
            setActiveHeadingText(matchedHeading.text);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-10% 0px -60% 0px",
      threshold: 0.1,
    });

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [headings]);

  if (!isVisible || headings.length === 0) return null;

  // Circular SVG progress ring calculations
  const radius = 10;
  const strokeWidth = 2.5;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
      <div className="flex items-center gap-3 sm:gap-4 rounded-full border border-white/15 dark:border-zinc-700/80 bg-zinc-950/90 dark:bg-zinc-900/90 px-4 py-2 text-foreground shadow-2xl backdrop-blur-md max-w-[90vw] sm:max-w-md select-none">
        {/* Left Section: Reading Label & Current Heading */}
        <div className="flex flex-col min-w-0 pr-1">
          <span className="text-[9px] font-mono font-semibold tracking-widest text-muted-foreground/80 uppercase">
            READING
          </span>
          <span className="text-xs font-mono font-medium text-foreground truncate max-w-[170px] sm:max-w-[240px] leading-tight">
            {activeHeadingText || headings[0]?.text || "Article Overview"}
          </span>
        </div>

        {/* Vertical Separator */}
        <div className="h-5 w-[1px] bg-border/40 shrink-0" />

        {/* Circular SVG Progress Ring */}
        <div className="relative h-7 w-7 shrink-0 flex items-center justify-center">
          <svg className="h-7 w-7 -rotate-90 transform" viewBox="0 0 24 24">
            {/* Background Track Circle */}
            <circle
              cx="12"
              cy="12"
              r={normalizedRadius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-muted/30 fill-none"
            />
            {/* Animated Progress Circle */}
            <circle
              cx="12"
              cy="12"
              r={normalizedRadius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              className="text-emerald-500 dark:text-emerald-400 fill-none transition-all duration-150 ease-out"
            />
          </svg>
          <span className="absolute text-[8px] font-mono font-semibold text-foreground">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
