import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prismaClient";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
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
        if (!credentials?.email || !credentials.password) {
          console.log("メールアドレスまたはパスワードが未入力です");
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
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },

    async jwt({ token, user }) {
      // 初回ログイン時（signIn後にuserが存在）
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        return token;
      }

      // 際訪問時やリロード時（userは存在せず、tokenのみ）
      if (token.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (existingUser) {
          token.id = existingUser.id;
          token.name = existingUser.name;
          token.email = existingUser.email;
          token.image = existingUser.image;
        } else {
          // ユーザーが存在しない場合は新規作成（APIルート使用）
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: token.name,
                email: token.email,
                password: "password",
                image: token.image ?? token.picture ?? null,
              }),
            }
          );

          if (!res.ok) {
            throw new Error(`Error ${res.status}: ユーザーの作成失敗`);
          }

          const { user: createUser } = await res.json();

          token.id = createUser.id;
          token.name = createUser.name;
          token.email = createUser.email;
          token.image = createUser.image;
        }
      }
      return token;
    },
  },
};
