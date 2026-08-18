import * as React from "react";
import { Navbar } from "@/components/navigation/navbar";

interface PortfolioShellProps {
  children: React.ReactNode;
}

/**
 * PortfolioShell creates the global framed portfolio structure:
 * Outer browser environment and inner portfolio canvas surface use the EXACT same background color
 * (Dark Mode: #09090B, Light Mode: #F4F0E9).
 * The frame is visually identified strictly through thin border lines and flanking diagonal hatch side strips.
 */
export function PortfolioShell({ children }: PortfolioShellProps) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-200">
      <div className="mx-auto flex min-h-screen h-auto w-full max-w-[var(--portfolio-frame-width)] border-x border-border/50 bg-background">
        {/* Left Hatch Side Edge */}
        <div className="hidden sm:block w-4 md:w-5 shrink-0 border-r border-border/50 hatch-pattern select-none pointer-events-none" />

        {/* Center Editorial Content Surface */}
        <div className="flex-1 min-w-0 flex flex-col min-h-screen bg-background">
          <Navbar />
          {children}
        </div>

        {/* Right Hatch Side Edge */}
        <div className="hidden sm:block w-4 md:w-5 shrink-0 border-l border-border/50 hatch-pattern select-none pointer-events-none" />
      </div>
    </div>
  );
}
