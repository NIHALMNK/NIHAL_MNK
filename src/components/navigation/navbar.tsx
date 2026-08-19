"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteSettingsData } from "@/data/site";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Craft", href: "/craft" },
  { label: "Blogs", href: "/blog" },
  { label: "Stack", href: "/stack" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 dark:bg-background/65 backdrop-blur-md transition-colors duration-200">
      <nav
        aria-label="Global"
        className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 md:px-8"
      >
        {/* Left Section: Avatar + Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          {/* Avatar Home Link */}
          <Link
            href="/"
            aria-label="Home"
            className="shrink-0 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
          >
            <Image
              src={siteSettingsData.avatar.url}
              alt={siteSettingsData.avatar.alt}
              width={36}
              height={36}
              priority
              className="h-9 w-9 rounded-lg object-cover border border-border/40"
            />
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    className={cn(
                      "text-[13px] font-semibold transition-colors duration-150 py-1",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Section: Search Trigger + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
          {/* Search Trigger Button (Visual Control) */}
          <button
            type="button"
            aria-label="Search portfolio"
            className="inline-flex h-9 items-center justify-between gap-3 rounded-lg border border-border/50 bg-muted/40 px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="hidden sm:inline text-xs">Search...</span>
            <span className="inline sm:hidden text-xs">Search</span>
            <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border/50 bg-background/60 px-1.5 font-mono text-[10px] font-medium text-muted-foreground select-none">
              ⌘ K
            </kbd>
          </button>

          {/* Single Theme Toggle Component */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
