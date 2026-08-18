import { IntroSection } from "@/components/home/intro-section";
import { EngineeringActivitySection } from "@/components/home/engineering-activity-section";
import { getSiteSettings } from "@/lib/data/site";
import { getEngineeringActivity } from "@/lib/data/activity";

export default async function HomePage() {
  const [siteSettings, engineeringActivity] = await Promise.all([
    getSiteSettings(),
    getEngineeringActivity(),
  ]);

  return (
    <div className="flex-1 flex flex-col">
      <IntroSection siteSettings={siteSettings} />
      <EngineeringActivitySection data={engineeringActivity} />
    </div>
  );
}



