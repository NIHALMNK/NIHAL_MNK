import { IntroSection } from "@/components/home/intro-section";
import { AboutSection } from "@/components/home/about-section";
import { EngineeringActivitySection } from "@/components/home/engineering-activity-section";
import { ProofOfWorkSection } from "@/components/home/proof-of-work-section";
import { AchievementsSection } from "@/components/home/achievements-section";
import { WritingThoughtsSection } from "@/components/home/writing-thoughts-section";
import { getSiteSettings } from "@/lib/data/site";
import { getEngineeringActivity } from "@/lib/data/activity";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getAchievements } from "@/lib/data/achievements";
import { getLatestPosts } from "@/lib/data/blog";
import { getAllTechnologies } from "@/lib/data/stack";

export default async function HomePage() {
  const [siteSettings, engineeringActivity, featuredProjects, achievements, latestPosts, allTechnologies] =
    await Promise.all([
      getSiteSettings(),
      getEngineeringActivity(),
      getFeaturedProjects(),
      getAchievements(),
      getLatestPosts(2),
      getAllTechnologies(),
    ]);

  return (
    <div className="flex-1 flex flex-col">
      <IntroSection siteSettings={siteSettings} />
      <AboutSection siteSettings={siteSettings} allTechnologies={allTechnologies} />
      <EngineeringActivitySection data={engineeringActivity} />
      <ProofOfWorkSection projects={featuredProjects} />
      <AchievementsSection achievements={achievements} />
      <WritingThoughtsSection posts={latestPosts} />
    </div>
  );
}
