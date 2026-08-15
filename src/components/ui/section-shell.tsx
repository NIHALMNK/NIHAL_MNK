import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "./container";

interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  title?: string;
  description?: string;
  badge?: string;
}

export function SectionShell({
  id,
  title,
  description,
  badge,
  className,
  children,
  ...props
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("py-12 sm:py-16 lg:py-20", className)}
      {...props}
    >
      <Container>
        {(title || description || badge) && (
          <div className="mb-8 sm:mb-12 max-w-2xl space-y-3">
            {badge && (
              <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
