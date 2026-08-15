import { SectionShell } from "@/components/ui/section-shell";
import { getStackItems } from "@/lib/data/stack";

export const metadata = {
  title: "Tech Stack — Nihal Portfolio",
  description: "Comprehensive breakdown of programming languages, frameworks, design tools, and infrastructure.",
};

export default async function StackPage() {
  const stack = await getStackItems();

  return (
    <SectionShell
      title="Tech Stack & Tools"
      description="Technologies, frameworks, and engineering tools powering production systems."
      badge="Capabilities"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((item) => (
          <div key={item.id} className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">{item.name}</h3>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold uppercase text-muted-foreground">
                {item.category}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
