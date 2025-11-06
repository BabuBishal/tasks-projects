import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

        const res = await fetch("http://localhost:4000/users");
        const users = await res.json();
        // console.log("user", users);
        // Check for matching user
        const user = users.find(
          (u: any) => u.email === email && u.password === password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        // If login fails

        if (!res.ok || !user) {
          throw new Error(user?.error || "Invalid credentials");
        }
        return null;

       
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "en/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
