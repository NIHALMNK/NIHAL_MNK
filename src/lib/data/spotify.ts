import { SpotifyTrack } from "@/types/spotify";
import { fetchSpotifyNowPlayingServer } from "@/lib/spotify/client";

export async function getSpotifyNowPlaying(): Promise<SpotifyTrack> {
  return fetchSpotifyNowPlayingServer();
}
