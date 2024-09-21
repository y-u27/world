// GET→〜/api/worldPosts：投稿の一覧を取得する
// POST→〜/api/worldPosts：投稿を新規作成する

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismaClient";

// 全投稿データを取得
export async function GET() {
  const worldPostData = await prisma.post.findMany();
  // 取得した投稿データを返す
  return NextResponse.json(
    {
      success: true,
      message: "投稿データ取得",
      data: worldPostData,
    },
    {
      status: 200,
    }
  );
}

// 投稿データの作成
export async function POST(request: Request) {
  const { title, content, createdAt } = await request.json();

  const newWorldPostData = await prisma.post.create({
    data: {
      title,
      content,
      createdAt,
    },
  });
  return NextResponse.json(
    {
      success: true,
      message: "投稿完了！",
      data: newWorldPostData,
    },
    {
      status: 201,
    }
  );
}
