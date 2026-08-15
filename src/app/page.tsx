import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getSiteSettings } from "@/lib/data/site";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const site = await getSiteSettings();
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="flex min-h-screen flex-col justify-center py-16">
      <Container>
        <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-8 shadow-sm sm:p-12">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                System Foundation Ready
              </span>
              <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                {site.name} — Personal Portfolio System
              </h1>
            </div>
            <ThemeToggle />
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-base text-muted-foreground leading-relaxed">
              {site.headline}
            </p>

            <div className="rounded-lg bg-muted/60 p-4 border border-border/50">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Established Architecture Architecture Verification
              </h3>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Next.js App Router</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>CMS-Shaped Local Datasets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Strict Priority 1–4 Projects ({featuredProjects.length} Featured)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Light / Dark Theme System</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Empty-State API Fallbacks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Normalized Media Contracts</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Routes Foundation:</span>
              <Link href="/projects" className="hover:text-foreground underline underline-offset-4">/projects</Link>
              <Link href="/blog" className="hover:text-foreground underline underline-offset-4">/blog</Link>
              <Link href="/craft" className="hover:text-foreground underline underline-offset-4">/craft</Link>
              <Link href="/stack" className="hover:text-foreground underline underline-offset-4">/stack</Link>
              <Link href="/contact" className="hover:text-foreground underline underline-offset-4">/contact</Link>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground pt-2">
              <span>Next recommended task:</span>
              <span className="font-semibold text-foreground flex items-center gap-1">
                Navbar Implementation <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
