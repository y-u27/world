import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prismaClient";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    // ↓Googleログイン
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ↓独自ログイン
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          user &&
          (await bcrypt.compare(credentials!.password, user.password))
        ) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks:{
    async session({session,token}) {
      session.user.id = token.id
      return session
    },
    async jwt({token,user}) {
      if(user) {
        token.id = user.id
      }
      return token
    }
  },
  secret: process.env.SECRET,
});

export { handler as GET, handler as POST };
