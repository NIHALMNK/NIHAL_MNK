import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SectionErrorFallbackProps {
  title?: string;
  description?: string;
  className?: string;
  onRetry?: () => void;
}

export function SectionErrorFallback({
  title = "Failed to load section data",
  description = "An unexpected error occurred while retrieving information for this section.",
  className,
  onRetry,
}: SectionErrorFallbackProps) {
  return (
    <div
      className={cn(
        "flex min-h-[160px] w-full flex-col items-center justify-center rounded-lg border border-border bg-card p-6 text-center shadow-sm",
        className
      )}
    >
      <div className="mb-3 rounded-full bg-muted p-2 text-foreground">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
      </div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground max-w-md leading-relaxed">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
