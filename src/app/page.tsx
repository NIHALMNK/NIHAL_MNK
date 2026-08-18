import { IntroSection } from "@/components/home/intro-section";
import { EngineeringActivitySection } from "@/components/home/engineering-activity-section";
import { ProofOfWorkSection } from "@/components/home/proof-of-work-section";
import { getSiteSettings } from "@/lib/data/site";
import { getEngineeringActivity } from "@/lib/data/activity";
import { getFeaturedProjects } from "@/lib/data/projects";

export default async function HomePage() {
  const [siteSettings, engineeringActivity, featuredProjects] = await Promise.all([
    getSiteSettings(),
    getEngineeringActivity(),
    getFeaturedProjects(),
  ]);

  return (
    <div className="flex-1 flex flex-col">
      <IntroSection siteSettings={siteSettings} />
      <EngineeringActivitySection data={engineeringActivity} />
      <ProofOfWorkSection projects={featuredProjects} />
    </div>
  );
}
