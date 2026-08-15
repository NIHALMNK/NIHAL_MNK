import { SectionShell } from "@/components/ui/section-shell";
import { getCraftItems } from "@/lib/data/craft";

export const metadata = {
  title: "Craft — Nihal Portfolio",
  description: "UI experiments, interactive motion prototypes, and micro-frontend explorations.",
};

export default async function CraftPage() {
  const craftItems = await getCraftItems();

  return (
    <SectionShell
      title="Craft & Experiments"
      description="UI micro-interactions, canvas experiments, and interactive layout prototypes."
      badge="Laboratories"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {craftItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2 text-xs">
              {item.technologies.map((t) => (
                <span key={t} className="rounded bg-muted px-2 py-0.5 text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
