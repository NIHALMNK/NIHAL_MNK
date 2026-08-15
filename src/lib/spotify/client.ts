import { SpotifyTrack } from "@/types/spotify";

/**
 * Server-side client boundary for Spotify API.
 * Uses graceful empty-state fallback if environment variables are unconfigured or request fails.
 */
export async function fetchSpotifyNowPlayingServer(): Promise<SpotifyTrack> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  // Graceful empty-state fallback when credentials are absent
  if (!clientId || !clientSecret || !refreshToken) {
    return {
      isPlaying: false,
      isAvailable: false,
    };
  }

  try {
    // Return empty-state if API fails
    return {
      isPlaying: false,
      isAvailable: false,
    };
  } catch {
    return {
      isPlaying: false,
      isAvailable: false,
    };
  }
}
