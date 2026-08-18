"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface ProjectVideoPreviewProps {
  videoUrl?: string;
  posterUrl?: string;
  altText: string;
  playbackRate?: number;
  className?: string;
}

export function ProjectVideoPreview({
  videoUrl,
  posterUrl,
  altText,
  playbackRate = 1,
  className,
}: ProjectVideoPreviewProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = React.useState(false);

  // Update playback speed when playbackRate prop changes
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Ensure continuous autoplay on mount & handle browser autoplay policies gracefully
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay may be deferred or blocked by browser policy; retain poster fallback
        console.debug("[ProjectVideoPreview] Autoplay deferred:", err?.message || err);
      });
    }

    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [videoUrl]);

  if (!videoUrl || hasError) {
    return (
      <div className={cn("relative w-full h-full bg-muted/40 overflow-hidden", className)}>
        {posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterUrl}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-mono text-muted-foreground">
            No Video Preview
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full bg-black/90 overflow-hidden", className)}>
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        aria-label={altText}
      />
    </div>
  );
}
