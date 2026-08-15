"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground antialiased font-sans">
        <div className="mx-auto max-w-md text-center space-y-4 rounded-xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Critical Application Error</h1>
          <p className="text-sm text-muted-foreground">
            A critical error occurred in the root layout shell.
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
