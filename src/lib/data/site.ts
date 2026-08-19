import { SiteSettings } from "@/types/site";
import { siteSettingsData } from "@/data/home/site";

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettingsData;
}
