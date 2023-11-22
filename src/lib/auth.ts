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
  // session: {
  //   strategy: "jwt",
  // },
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
    async jwt({ token, user }) {
      const dbUser = ((await db.get(`user:${token.id}`)) as User) || null;

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.email,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },

    async session({ session, token, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
      }
      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
