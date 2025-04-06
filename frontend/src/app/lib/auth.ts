import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prismaClient";
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
          where: { email: credentials.email },
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
      let newUser: Awaited<ReturnType<typeof prisma.user.create>> | null = null;
      //すでにユーザーが存在する場合はユーザー情報を保持
      if (token.email) {
        const prismaUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        if (prismaUser) newUser = prismaUser;

        //ユーザーが存在しない場合は新規作成したユーザー情報を保持する
        if (!prismaUser) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: token.name,
                email: token.email,
                password: "password",
                image: token.picture,
              }),
            }
          );

          if (!res.ok) {
            throw new Error(`Error ${res.status}:ユーザーの作成失敗`);
          }

          const { user } = await res.json();
          newUser = user;
        }
      }

      //ユーザーがサインインまたはサインアップした場合、JWTトークンにユーザー情報を追加または更新
      if (user && newUser) {
        token.id = newUser.id;
        token.name = newUser.name;
        token.email = newUser.email;
        token.image = newUser.image;
      } else if (user) {
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
