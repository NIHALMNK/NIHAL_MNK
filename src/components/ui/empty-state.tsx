import * as React from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function EmptyState({
  title = "No items available",
  description = "There are currently no items to display in this collection.",
  className,
  icon: Icon = FolderOpen,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[200px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center",
        className
      )}
    >
      <div className="mb-3 rounded-full bg-muted p-3 text-muted-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground max-w-sm leading-relaxed">{description}</p>
    </div>
  );
}
