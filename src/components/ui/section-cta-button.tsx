"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SectionCtaButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  isExternal?: boolean;
  className?: string;
}

export function SectionCtaButton({
  href,
  children,
  icon: Icon = ArrowRight,
  isExternal = false,
  className,
}: SectionCtaButtonProps) {
  const content = (
    <div
      className={cn(
        "group relative inline-flex items-center justify-center select-none cursor-pointer",
        className
      )}
    >
      {/* Outer Expanded Hover Ring Effect */}
      <span className="absolute -inset-1 rounded-full border border-foreground/40 dark:border-foreground/50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none" />

      {/* Main Solid Button Body */}
      <span className="relative inline-flex items-center gap-2 rounded-full bg-foreground px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-mono font-semibold text-background shadow-xs group-hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2">
        <span>{children}</span>
        {Icon && (
          <Icon className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
      </span>
    </div>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block focus-visible:outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-block focus-visible:outline-none">
      {content}
    </Link>
  );
}
