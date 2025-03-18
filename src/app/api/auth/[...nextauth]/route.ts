import { createUser } from "@/lib/service/user-service";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authenticationOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 365,
    updateAge: 0, // is ignored with JWT
  },
  jwt: {},
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const savedUser = await createUser(account?.provider ?? "", profile);
      if (!savedUser) {
        return false;
      }
      user.id = String(savedUser.id);
      return true;
    },
    async session({ session, user, token }) {
      // if (session && token) {
      //   session.user.id = token.userId;
      // }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_CLIENT_ID || '',
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
    //   version: '2.0'
    // }),
    // DiscordProvider({
    //   clientId: process.env.DISCORD_CLIENT_ID || "",
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    // }),
    // TwitchProvider({
    //   clientId: process.env.TWITCH_CLIENT_ID || "",
    //   clientSecret: process.env.TWITCH_CLIENT_SECRET || "",
    // }),
  ],
};

const handler = async (
  req: NextApiRequest,
  resp: NextApiResponse,
  authOptions: NextAuthOptions,
): Promise<any> => {
  return NextAuth(req, resp, authenticationOptions);
};

//const handler = NextAuth({authenticationOptions})

export { handler as GET, handler as POST };
