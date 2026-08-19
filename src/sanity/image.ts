import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import { projectId, dataset } from "./config";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
});

/**
 * Returns a URL builder for Sanity Image assets.
 */
export function urlForImage(source: Parameters<typeof imageBuilder.image>[0]) {
  return imageBuilder.image(source);
}
