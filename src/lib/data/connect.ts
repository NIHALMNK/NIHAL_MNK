import { ConnectLinks } from "@/types/connect";
import { connectLinksData } from "@/data/connect";

/**
 * Returns the centralized social/contact links.
 * This is the single authoritative source for Footer, Navbar, Contact, and About sections.
 */
export async function getConnectLinks(): Promise<ConnectLinks> {
  return connectLinksData;
}

/**
 * Synchronous version for use in client components (Footer, Navbar).
 */
export function getConnectLinksSync(): ConnectLinks {
  return connectLinksData;
}
