import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prismaClient";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  providers: [
    // ↓Googleログイン
    //GoogleログインだとuserIdが64ビット以上のため、エラーになる
    //解消するためにはGoogleログインはsession.user.userIdで
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // ↓独自ログイン
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        image: { label: "Image", type: "image" },
      },
      async authorize(credentials, req) {
        console.log("入力されてメールアドレス", credentials?.email);
        console.log("入力されたパスワード", credentials?.password);
        console.log("設定された画像", credentials?.image);

        if (!credentials?.email || !credentials.password) {
          console.log("メールアドレスまたはパスワードが未入力です");
          return null;
        }

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
            image: user.image,
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
      session.user.image = token.image;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
  },
  secret: process.env.SECRET,
};
