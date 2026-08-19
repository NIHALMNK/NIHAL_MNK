import * as React from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { getSiteSettings } from "@/lib/data/site";
import { getConnectLinks } from "@/lib/data/connect";

interface PortfolioShellProps {
  children: React.ReactNode;
}

/**
 * PortfolioShell creates the global framed portfolio structure:
 * Outer browser environment and inner portfolio canvas surface use the EXACT same background color
 * (Dark Mode: #09090B, Light Mode: #F4F0E9).
 * The frame is visually identified strictly through thin border lines and flanking diagonal hatch side strips.
 *
 * This is a Server Component — it fetches site settings and connect links once and
 * passes them down to Navbar and Footer, eliminating direct @/data/* imports in client components.
 */
export async function PortfolioShell({ children }: PortfolioShellProps) {
  const [siteSettings, connectLinks] = await Promise.all([
    getSiteSettings(),
    getConnectLinks(),
  ]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-200">
      <div className="mx-auto flex min-h-screen h-auto w-full max-w-[var(--portfolio-frame-width)] border-x border-border/50 bg-background">
        {/* Left Hatch Side Edge */}
        <div className="hidden sm:block w-4 md:w-5 shrink-0 border-r border-border/50 hatch-pattern select-none pointer-events-none" />

        {/* Center Editorial Content Surface */}
        <div className="flex-1 min-w-0 flex flex-col min-h-screen bg-background">
          <Navbar avatarUrl={siteSettings.avatar?.url} avatarAlt={siteSettings.avatar?.alt} />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer connectLinks={connectLinks} email={siteSettings.email} resumeUrl={siteSettings.resumeUrl} />
        </div>

        {/* Right Hatch Side Edge */}
        <div className="hidden sm:block w-4 md:w-5 shrink-0 border-l border-border/50 hatch-pattern select-none pointer-events-none" />
      </div>
    </div>
  );
}
