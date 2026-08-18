"use client";

import * as React from "react";
import { Technology } from "@/types/stack";
import { Code2 } from "lucide-react";

interface TechIconProps {
  technology: Technology;
  className?: string;
}

export function TechIcon({ technology, className = "h-3.5 w-3.5 shrink-0" }: TechIconProps) {
  const [imageError, setImageError] = React.useState(false);

  // Render technology icon from technology data if URL exists and has not errored
  if (technology?.icon?.url && !imageError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={technology.icon.url}
        alt={technology.icon.alt || technology.name}
        className={`${className} object-contain`}
        onError={() => setImageError(true)}
      />
    );
  }

  // Neutral technical icon fallback if image is missing or fails to load
  return <Code2 className={className} />;
}
