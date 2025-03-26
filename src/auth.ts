import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";

const authenticationOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  // secret: process.env.NEXTAUTH_SECRET || "",
  // session: {
  //   strategy: "jwt",
  //   maxAge: 60 * 60 * 24 * 365,
  //   updateAge: 0, // is ignored with JWT
  // },
  // jwt: {},
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     const savedUser = await createUser(account?.provider ?? "", profile);
  //     if (!savedUser) {
  //       return false;
  //     }
  //     user.id = String(savedUser.id);
  //     return true;
  //   },
  //   async session({ session, user, token }) {
  //     console.log("session: ", session);
  //     console.log("session user: ", user);
  //     // if (session && token) {
  //     //   session.user.id = token.userId;
  //     // }
  //     return session;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return url;
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     console.log("jwt user: ", user);
  //     console.log("jwt token: ", token);
  //     if (user) {
  //       token.userId = user.id;
  //     }
  //     return token;
  //   },
  // },
  // Configure one or more authentication providers
  providers: [Google],
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("signin user: ", user);
      console.log("signin account: ", account);
      console.log("signin profile: ", profile);
      return true;
    },
  },
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});
