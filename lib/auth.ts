import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";
export const auth = betterAuth({
  // database: memoryAdapter(),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwt",
      refreshCache: true,
    },
  },
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
  },

  socialProviders: {
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      scope: ["users.read", "tweet.read", "offline.access"],
    },
  },
});
