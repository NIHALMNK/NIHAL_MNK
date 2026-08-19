import { Metadata } from "next";
import { Instagram, Github, Linkedin, Mail, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Connect — Mohammed Nihal K",
  description: "Reach out to me on any of these platforms.",
};

export default async function ContactPage() {
  const site = await getSiteSettings();

  const connectLinks = [
    {
      label: "Instagram",
      href: site.socials.instagram || "https://instagram.com/",
      icon: Instagram,
      external: true,
    },
    {
      label: "GitHub",
      href: site.socials.github,
      icon: Github,
      external: true,
    },
    {
      label: "LinkedIn",
      href: site.socials.linkedin,
      icon: Linkedin,
      external: true,
    },
    {
      label: "Email",
      href: `mailto:${site.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: "Resume",
      href: site.resumeUrl || "/resume.pdf",
      icon: FileText,
      external: true,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Connect
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Reach out to me on any of these platforms.
          </p>
        </div>

        {/* 5 Social Buttons in Exact Order: Instagram -> GitHub -> LinkedIn -> Email -> Resume */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          {connectLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/20 px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground hover:bg-muted/50 hover:border-border transition-all duration-150 shadow-sm select-none"
              >
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
