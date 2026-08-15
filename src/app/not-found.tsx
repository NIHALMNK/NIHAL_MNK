import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[65vh] flex-col items-center justify-center text-center">
      <div className="mx-auto max-w-md space-y-4 rounded-xl border border-border bg-card p-8 shadow-sm">
        <span className="text-4xl font-extrabold text-foreground">404</span>
        <h2 className="text-lg font-bold text-foreground">Page Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The route you requested could not be located or does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Return Home
        </Link>
      </div>
    </Container>
  );
}
