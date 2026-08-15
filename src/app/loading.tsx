import { Container } from "@/components/ui/container";
import { LoadingSpinner } from "@/components/ui/loading-state";

export default function Loading() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center">
      <LoadingSpinner />
    </Container>
  );
}
