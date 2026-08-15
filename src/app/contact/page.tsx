import { SectionShell } from "@/components/ui/section-shell";
import { getSiteSettings } from "@/lib/data/site";

export const metadata = {
  title: "Contact — Nihal Portfolio",
  description: "Get in touch for technical inquiries, consulting, or project inquiries.",
};

export default async function ContactPage() {
  const site = await getSiteSettings();

  return (
    <SectionShell
      title="Let's Connect"
      description="Available for select senior engineering consulting, frontend architecture roles, and technical discussions."
      badge="Contact"
    >
      <div className="max-w-xl rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Direct Email</span>
          <p className="mt-1 text-lg font-bold text-foreground">{site.email}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Location</span>
          <p className="mt-1 text-base text-foreground">{site.location}</p>
        </div>
        <div className="pt-4 border-t border-border flex gap-4 text-sm font-semibold">
          <a href={site.socials.github} target="_blank" rel="noreferrer" className="hover:underline">
            GitHub ↗
          </a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
            LinkedIn ↗
          </a>
          {site.socials.twitter && (
            <a href={site.socials.twitter} target="_blank" rel="noreferrer" className="hover:underline">
              Twitter / X ↗
            </a>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
