import { GitHubActivity } from "@/types/github";
import { fetchGitHubActivityServer } from "@/lib/github/client";

export async function getGitHubActivity(): Promise<GitHubActivity> {
  return fetchGitHubActivityServer();
}
