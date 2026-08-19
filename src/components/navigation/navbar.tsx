"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Code2,
  FileText,
  User,
  Home,
  Layers,
  Mail,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils/cn";

const desktopNavItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Stack", href: "/stack" },
];

const mobileMenuNavItems = [
  { label: "About", href: "/about", icon: User },
  { label: "Projects", href: "/projects", icon: Code2 },
  { label: "Blogs", href: "/blogs", icon: FileText },
];

const globalSearchItems = [
  { id: "home", label: "Home", href: "/", icon: Home, keywords: ["main", "index", "landing"] },
  { id: "about", label: "About", href: "/about", icon: User, keywords: ["bio", "profile", "experience", "education"] },
  { id: "projects", label: "Projects", href: "/projects", icon: Code2, keywords: ["work", "showcase", "portfolio"] },
  { id: "blogs", label: "Blogs", href: "/blogs", icon: FileText, keywords: ["articles", "posts", "writing"] },
  { id: "stack", label: "Stack", href: "/stack", icon: Layers, keywords: ["tech", "skills", "tools"] },
  { id: "contact", label: "Contact", href: "/contact", icon: Mail, keywords: ["email", "get in touch", "message"] },
];

interface NavbarProps {
  /** Avatar image URL from site settings — passed by PortfolioShell server component */
  avatarUrl?: string;
  /** Avatar alt text from site settings */
  avatarAlt?: string;
  /** Optional connect links */
  connectLinks?: unknown;
  /** Optional email */
  email?: string;
}

export function Navbar({
  avatarUrl,
  avatarAlt = "Mohammed Nihal K",
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Mobile 3-link Navigation Menu state
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Global Search Dialog state
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchActiveIndex, setSearchActiveIndex] = React.useState(0);
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

  // Close mobile menu
  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Open / close search modal
  const openSearch = React.useCallback(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
    setSearchQuery("");
    setSearchActiveIndex(0);
  }, []);

  const closeSearch = React.useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchActiveIndex(0);
  }, []);

  // Lock body scroll when either menu or search is open
  React.useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isSearchOpen]);

  // Focus search input when search opens
  React.useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Global Keyboard listener for Cmd+K and Escape
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          openSearch();
        }
      } else if (e.key === "Escape") {
        if (isSearchOpen) closeSearch();
        if (isMenuOpen) closeMenu();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isSearchOpen, isMenuOpen, openSearch, closeSearch, closeMenu]);

  // Filtered search results
  const filteredSearchItems = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return globalSearchItems;

    return globalSearchItems.filter((item) => {
      const matchLabel = item.label.toLowerCase().includes(q);
      const matchHref = item.href.toLowerCase().includes(q);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchLabel || matchHref || matchKeywords;
    });
  }, [searchQuery]);

  const handleSearchSelect = React.useCallback(
    (href: string) => {
      closeSearch();
      router.push(href);
    },
    [router, closeSearch]
  );

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredSearchItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSearchActiveIndex((prev) => (prev + 1) % filteredSearchItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSearchActiveIndex((prev) => (prev - 1 + filteredSearchItems.length) % filteredSearchItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredSearchItems[searchActiveIndex];
      if (selected) {
        handleSearchSelect(selected.href);
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full pointer-events-none">
        <div className="mx-auto flex w-full max-w-[var(--portfolio-frame-width)] border-x border-border/50 bg-background pointer-events-auto">
          {/* Left Hatch Side Edge */}
          <div className="hidden sm:block w-4 md:w-5 shrink-0 border-r border-border/50 hatch-pattern select-none pointer-events-none" />

          {/* Center Editorial Content Surface Bar */}
          <div className="flex-1 min-w-0 border-b border-border/40 bg-background/80 dark:bg-background/65 backdrop-blur-md transition-colors duration-200">
            <nav
              aria-label="Global"
              className="flex h-16 w-full items-center justify-between px-4 sm:px-6 md:px-8"
            >
              {/* Left Section: Avatar + Desktop Navigation Links */}
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                {/* Avatar Home Link */}
                <Link
                  href="/"
                  aria-label="Home"
                  onClick={closeMenu}
                  className="shrink-0 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
                >
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={avatarAlt}
                      width={36}
                      height={36}
                      priority
                      className="h-9 w-9 rounded-lg object-cover border border-border/40"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-lg border border-border/40 bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground select-none">
                      N
                    </div>
                  )}
                </Link>

                {/* Desktop-Only Navigation Links (>= 768px) */}
                <ul className="hidden md:flex items-center gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar py-1">
                  {desktopNavItems.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname === item.href ||
                          (item.href !== "/" && pathname.startsWith(`${item.href}`));

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

              {/* Right Section: Search Trigger + Theme Toggle + Mobile Hamburger */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                {/* Desktop Search Trigger Button */}
                <button
                  type="button"
                  onClick={openSearch}
                  aria-label="Search portfolio"
                  className="hidden md:inline-flex h-9 items-center justify-between gap-3 rounded-lg border border-border/50 bg-muted/40 px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-xs">Search...</span>
                  <kbd className="inline-flex h-5 items-center rounded border border-border/50 bg-background/60 px-1.5 font-mono text-[10px] font-medium text-muted-foreground select-none">
                    ⌘ K
                  </kbd>
                </button>

                {/* Mobile Search Icon Button (< 768px) */}
                <button
                  type="button"
                  onClick={openSearch}
                  aria-label="Search portfolio"
                  className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-muted/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Search className="h-4 w-4" />
                </button>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Mobile Hamburger / Close Button (< 768px) */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-navigation-menu"
                  className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-muted/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isMenuOpen ? (
                    <X className="h-4 w-4 transition-transform duration-150" />
                  ) : (
                    <Menu className="h-4 w-4 transition-transform duration-150" />
                  )}
                </button>
              </div>
            </nav>
          </div>

          {/* Right Hatch Side Edge */}
          <div className="hidden sm:block w-4 md:w-5 shrink-0 border-l border-border/50 hatch-pattern select-none pointer-events-none" />
        </div>
      </header>

      {/* ─── Mobile 3-Link Navigation Menu Panel (< 768px) ─── */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeMenu}
            aria-hidden="true"
            className="md:hidden fixed inset-0 z-50 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in-0 duration-200"
          />

          {/* Floating Minimal Glass Panel */}
          <div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="md:hidden fixed top-20 inset-x-4 max-w-sm mx-auto z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 outline-none"
          >
            <div className="rounded-2xl border border-border/70 bg-card/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl overflow-hidden p-2">
              <div role="menu" className="space-y-1">
                {mobileMenuNavItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(`${item.href}`));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={closeMenu}
                      className={cn(
                        "group flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 text-left select-none outline-none",
                        isActive
                          ? "bg-muted/80 dark:bg-white/10 text-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {isActive && (
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── Global Search Dialog (Mobile & Desktop) ─── */}
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeSearch}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in-0 duration-200"
          />

          {/* Floating Search Dialog */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search Dialog"
            className="fixed top-20 inset-x-4 max-w-md mx-auto z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 outline-none"
          >
            <div className="rounded-2xl border border-border/70 bg-card/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
              {/* Search Input Header */}
              <div className="relative flex items-center border-b border-border/40 px-3.5 py-3">
                <Search className="h-4 w-4 text-muted-foreground shrink-0 mr-2.5 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchActiveIndex(0);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Type a command or search..."
                  aria-label="Type a command or search"
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchActiveIndex(0);
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors ml-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Filtered Search Results */}
              <div className="p-2 space-y-1 max-h-[50vh] overflow-y-auto no-scrollbar">
                {filteredSearchItems.length > 0 ? (
                  filteredSearchItems.map((item, idx) => {
                    const isSelected = searchActiveIndex === idx;
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSearchSelect(item.href)}
                        onMouseEnter={() => setSearchActiveIndex(idx)}
                        className={cn(
                          "group flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-150 text-left select-none outline-none",
                          isSelected
                            ? "bg-muted/80 dark:bg-white/10 text-foreground font-medium shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-colors",
                              isSelected
                                ? "text-foreground"
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {isSelected && (
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs font-mono text-muted-foreground">
                    No results found for &ldquo;{searchQuery}&rdquo;.
                  </div>
                )}
              </div>

              {/* Footer Key Hints */}
              <div className="px-3.5 py-2.5 border-t border-border/40 bg-muted/20 flex items-center justify-between text-[11px] font-mono text-muted-foreground select-none">
                <span>Search...</span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted/60 border border-border/40 text-[10px]">
                    ↑↓ navigate
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted/60 border border-border/40 text-[10px]">
                    ↵ select
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
