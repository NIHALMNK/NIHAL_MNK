import * as React from "react";
import Image from "next/image";
import { MediaItem } from "@/types/media";
import { cn } from "@/lib/utils/cn";

interface MediaImageProps extends Omit<React.ComponentPropsWithoutRef<typeof Image>, "src" | "alt"> {
  media: MediaItem;
  className?: string;
  containerClassName?: string;
}

export function MediaImage({
  media,
  className,
  containerClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: MediaImageProps) {
  const width = media.width || 1200;
  const height = media.height || 675;

  return (
    <div className={cn("relative overflow-hidden bg-muted", containerClassName)}>
      <Image
        src={media.url}
        alt={media.alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        blurDataURL={media.blurDataURL}
        placeholder={media.blurDataURL ? "blur" : "empty"}
        className={cn("h-full w-full object-cover transition-opacity duration-300", className)}
        {...props}
      />
    </div>
  );
}
