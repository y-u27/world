// GET→〜/api/worldPosts：投稿の一覧を取得する
// POST→〜/api/worldPosts：投稿を新規作成する

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismaClient";

export async function GET() {
  const worldPosts = await prisma.post.findMany({
    where: {},
  });
}
