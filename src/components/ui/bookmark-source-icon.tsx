"use client";

import * as React from "react";
import { Globe } from "lucide-react";

interface BookmarkSourceIconProps {
  domain: string;
  iconUrl?: string;
  className?: string;
}

export function BookmarkSourceIcon({
  domain,
  iconUrl,
  className = "w-4 h-4 sm:w-5 sm:h-5",
}: BookmarkSourceIconProps) {
  const [hasError, setHasError] = React.useState(false);

  // Clean domain string for icon resolution
  const cleanDomain = React.useMemo(() => {
    return domain.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
  }, [domain]);

  // Priority 1: User-specified custom iconUrl
  // Priority 2: Dynamic domain favicon service (Google S2 Favicon service with 128px high-res assets)
  const resolvedSrc = iconUrl || (cleanDomain ? `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128` : null);

  if (!resolvedSrc || hasError) {
    return (
      <Globe
        className={`${className} text-muted-foreground`}
        aria-label={`${domain || "Source"} icon`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt={`${domain} icon`}
      className={`${className} object-contain rounded-sm`}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
