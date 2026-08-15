import { navigationConfigData } from "@/data/navigation";
import { siteSettingsData } from "@/data/site";

export const siteConfig = {
  name: siteSettingsData.name,
  role: siteSettingsData.role,
  description: siteSettingsData.headline,
  url: siteSettingsData.defaultSeo.siteUrl,
  mainNav: navigationConfigData.mainNav,
  links: navigationConfigData.socialLinks,
};
