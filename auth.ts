// ./auth.ts
import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Twitter({
      // Keep everything from the default provider you pasted
      authorization:
        "https://x.com/i/oauth2/authorize?scope=users.read tweet.read offline.access",
      token: "https://api.x.com/2/oauth2/token",
      userinfo: "https://api.x.com/2/users/me?user.fields=profile_image_url",

      // ← SAFE PROFILE + DEBUG LOG (this fixes the crash)
      profile(profile) {
        console.log(
          "🔍 RAW TWITTER PROFILE RESPONSE:",
          JSON.stringify(profile, null, 2),
        );

        // X sometimes returns error objects instead of { data: {...} }
        const data = profile?.data || profile;

        return {
          id: data.id,
          name: data.name,
          email: data.email ?? null,
          image: data.profile_image_url,
        };
      },
    }),
  ],
});
