import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prismaClient";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

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
        console.log("入力されてメールアドレス", credentials?.email);
        console.log("入力されたパスワード", credentials?.password);

        if (!credentials?.email || !credentials.password) {
          console.log("メールアドレスまたはパスワードが未入力です");
          return null;
        }

        await prisma.$connect();
        const user = await prisma.user.findUnique({
          where: { email: credentials.email } as Prisma.UserWhereUniqueInput,
        });
        console.log("データベースで見つかったユーザー", user);

        if (
          user &&
          (await bcrypt.compare(credentials!.password, user.password))
        ) {
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.SECRET,
});

export { handler as GET, handler as POST };
