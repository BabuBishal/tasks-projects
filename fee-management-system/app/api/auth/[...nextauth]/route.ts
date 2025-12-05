// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // Find user from Prisma
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Compare hashed password using bcrypt
        const isValid = await compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        // Return user with accessToken
        // If you have a token stored in your database
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          // accessToken: user.accessToken,
        };

        // If you generate a JWT token yourself
        // const accessToken = await generateAccessToken(user.id);
        // return {
        //   id: user.id,
        //   email: user.email,
        //   name: user.name,
        //   accessToken,
        // };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/en/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
