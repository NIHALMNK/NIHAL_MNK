import { IntroSection } from "@/components/home/intro-section";
import { getSiteSettings } from "@/lib/data/site";

export default async function HomePage() {
  const siteSettings = await getSiteSettings();

  return (
    <div className="flex-1 flex flex-col">
      <IntroSection siteSettings={siteSettings} />
    </div>
  );
}


