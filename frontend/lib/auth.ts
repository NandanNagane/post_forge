// lib/auth.ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwe",
      refreshCache: true,
    },
  },
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
  },
  socialProviders: {
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      disableDefaultScope: true, // ← skip the bad "users.email" scope
      scope: ["users.read", "tweet.read", "offline.access"],
      getUserInfo: async (token) => {
        // ← override with debug logging
        console.log(
          "🔑 Access token:",
          token.accessToken?.slice(0, 20) + "...",
        );

        console.log(" token:", token);

        const res = await fetch(
          "https://api.x.com/2/users/me?user.fields=profile_image_url,username",
          { headers: { Authorization: `Bearer ${token.accessToken}` } },
        );
        const profile = await res.json();
        console.log(
          "🐦 Twitter profile response:",
          JSON.stringify(profile, null, 2),
        );

        if (!profile?.data?.id) return null;

        return {
          user: {
            id: profile.data.id,
            name: profile.data.name,
            email: profile.data.username + "@twitter.placeholder" || null,
            image: profile.data.profile_image_url,
            emailVerified: false,
          },
          data: profile,
        };
      },
    },
  },
});
