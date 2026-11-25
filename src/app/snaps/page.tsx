import { Metadata } from "next";
import { getAllSnaps } from "@/lib/data/snaps";
import { SnapsGalleryView } from "@/components/snaps/snaps-gallery-view";

export const metadata: Metadata = {
  title: "Recent Snaps",
  description:
    "A visual showcase of moments, hackathons, conferences, and life beyond the screen.",
};

export default async function SnapsPage() {
  const snaps = await getAllSnaps();

  return <SnapsGalleryView snaps={snaps} />;
}
