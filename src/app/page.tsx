import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col justify-between py-8">
      <Container>
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
            Global Frame Canvas Established
          </span>
          <ThemeToggle />
        </div>

        <div className="py-16 text-center space-y-3">
          <p className="text-xs font-mono text-muted-foreground">
            [ Centered Editorial Frame Canvas ]
          </p>
          <p className="text-xs text-muted-foreground">
            Next Task: Navbar Design & Implementation
          </p>
        </div>
      </Container>
    </div>
  );
}
