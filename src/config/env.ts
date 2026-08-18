export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  github: {
    username: process.env.GITHUB_USERNAME || "NIHALMNK",
    token: process.env.GITHUB_ACCESS_TOKEN,
  },
  leetcode: {
    username: process.env.LEETCODE_USERNAME || "MohammedNihalk",
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  },
};
