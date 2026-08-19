import { navigationConfigData } from "@/data/home/site";
import { siteSettingsData } from "@/data/home/site";

export const siteConfig = {
  name: siteSettingsData.name,
  role: siteSettingsData.role,
  description: siteSettingsData.headline,
  url: siteSettingsData.defaultSeo.siteUrl,
  mainNav: navigationConfigData.mainNav,
  links: navigationConfigData.socialLinks,
};
