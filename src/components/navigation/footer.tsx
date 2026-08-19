"use client";

import Link from "next/link";
import { Instagram, Github, Linkedin, Mail, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteSettingsData } from "@/data/site";
import { useStaggerReveal } from "@/lib/animation/hooks";

export function Footer() {
  const footerRef = useStaggerReveal<HTMLElement>({
    itemSelector: "[data-animate-item]",
    y: 20,
    duration: 0.5,
    stagger: 0.06,
  });
  const connectLinks = [
    {
      label: "Instagram",
      href: siteSettingsData.socials.instagram || "https://instagram.com/",
      icon: Instagram,
      external: true,
    },
    {
      label: "GitHub",
      href: siteSettingsData.socials.github,
      icon: Github,
      external: true,
    },
    {
      label: "LinkedIn",
      href: siteSettingsData.socials.linkedin,
      icon: Linkedin,
      external: true,
    },
    {
      label: "Email",
      href: `mailto:${siteSettingsData.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: "Resume",
      href: siteSettingsData.resumeUrl || "/resume.pdf",
      icon: FileText,
      external: true,
    },
  ];

  return (
    <footer ref={footerRef} id="connect" className="mt-auto border-t border-border/40 bg-background">
      {/* 1. Main Connect Section (The visual footer) */}
      <section className="py-10 sm:py-14 md:py-16">
        <Container>
          {/* Section Header */}
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Connect
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Reach out to me on any of these platforms.
            </p>
          </div>

          {/* 5 Social Buttons Horizontal Row */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {connectLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  data-animate-item
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="glass-button group inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-all duration-150 shadow-xs select-none"
                >
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 2. Small Footer Metadata Row — 3-column CSS Grid layout */}
      <div className="border-t border-border/40 py-6 sm:py-8 bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center text-xs font-mono text-muted-foreground">
            {/* COLUMN 1: Copyright */}
            <div className="text-left">
              <p>© 2026 Mohammed Nihal.</p>
              <p className="mt-0.5">All rights reserved.</p>
            </div>

            {/* COLUMN 2: Built with Frameworks */}
            <div className="text-left leading-relaxed">
              <p>
                Built with{" "}
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  Next.js
                </a>{" "}

              </p>
            </div>

            {/* COLUMN 3: AI & Resource Links */}
            <div className="text-left flex flex-col gap-1">
              <div>
                <Link
                  href="/llms.txt"
                  target="_blank"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  LLMs.txt · AI Context File
                </Link>
              </div>
              <div>
                <Link
                  href="/robots.txt"
                  target="_blank"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  robots.txt
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
