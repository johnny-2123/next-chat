import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google";

function getGoogleCredentials() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!googleClientId || googleClientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!googleClientSecret || googleClientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return { googleClientId, googleClientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().googleClientId,
      clientSecret: getGoogleCredentials().googleClientSecret,
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
