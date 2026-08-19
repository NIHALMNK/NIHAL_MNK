import { IntroSection } from "@/components/home/intro-section";
import { AboutSection } from "@/components/home/about-section";
import { EngineeringActivitySection } from "@/components/home/engineering-activity-section";
import { ProofOfWorkSection } from "@/components/home/proof-of-work-section";
import { AchievementsSection } from "@/components/home/achievements-section";
import { WritingThoughtsSection } from "@/components/home/writing-thoughts-section";
import { BookmarksSection } from "@/components/home/bookmarks-section";
import { PersonalLifeSection } from "@/components/home/personal-life-section";
import { getSiteSettings } from "@/lib/data/site";
import { getEngineeringActivity } from "@/lib/data/activity";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getAchievements } from "@/lib/data/achievements";
import { getLatestPosts } from "@/lib/data/blog";
import { getAllTechnologies } from "@/lib/data/stack";
import { getRecentSnaps } from "@/lib/data/snaps";
import { getBookmarks } from "@/lib/data/bookmarks";

export default async function HomePage() {
  const [
    siteSettings,
    engineeringActivity,
    featuredProjects,
    achievements,
    latestPosts,
    allTechnologies,
    recentSnaps,
    bookmarks,
  ] = await Promise.all([
    getSiteSettings(),
    getEngineeringActivity(),
    getFeaturedProjects(),
    getAchievements(),
    getLatestPosts(2),
    getAllTechnologies(),
    getRecentSnaps(4),
    getBookmarks(),
  ]);

  return (
    <div className="flex-1 flex flex-col">
      <IntroSection siteSettings={siteSettings} />
      <EngineeringActivitySection data={engineeringActivity} />
      <ProofOfWorkSection projects={featuredProjects} />
      <AchievementsSection achievements={achievements} />
      <WritingThoughtsSection posts={latestPosts} />
      <BookmarksSection bookmarks={bookmarks} />
      <AboutSection siteSettings={siteSettings} allTechnologies={allTechnologies} />
      <PersonalLifeSection recentSnaps={recentSnaps} />
    </div>
  );
}
