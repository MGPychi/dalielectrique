"use sever";
// import { db } from "@/lib/db";
// import { eq } from "@/components/database/src";
// import { users } from "@/components/database/src/db/schema";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { verifyPassword } from "./passwords";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "admin" | "user";
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", placeholder: "Email", type: "email" },
        password: {
          label: "Password",
          placeholder: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        console.log("data",credentials)
        if (
          credentials.email == "admin@email.com" &&
          credentials.password == "password"
        ) {
          return {
            id: "1",
            email: credentials.email as string,
            name: "admin",
            role: "admin",
          };
        }
        return null;
      },
      // const email = credentials?.email;
      // const password = credentials?.password;
      // if (!email || !password) return null;
      // if (typeof email !== "string" || typeof password !== "string") {
      //   return null;
      // }
      // try {
      //   const user = await db.query.users.findFirst({
      //     where: eq(users.email, email),
      //   });
      //   if (!user || !user.password) return null;
      //   const isValid =
      //     user.role == "admin" &&
      //     (await verifyPassword(password as string, user.password));
      //   if (!isValid) return null;
      //   return {
      //     id: user.id as string,
      //     email: user.email as string,
      //     name: user.name as string,
      //     role: user.role as "admin" | "user",
      //   };
      // } catch (err) {
      //   console.log("Error in auth.ts ", err);
      //   return null;
      // }
      // },
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
