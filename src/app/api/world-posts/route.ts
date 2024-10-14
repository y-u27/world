// GET→〜/api/world-posts：投稿の一覧を取得する
// POST→〜/api/world-posts：投稿を新規作成する

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismaClient";

// 全投稿データを取得
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const encodedCountryName = searchParams.get("country-name");
  if (!encodedCountryName) return NextResponse.json({ success: false, message: "国名が指定されていません" }, { status: 400 });
  const decodedCountryName = decodeURIComponent(encodedCountryName);
  const worldPostData = await prisma.post.findMany({
    where: {
      countryName: decodedCountryName,
    },
  });
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
  const { title, content, createdAt, countryName } = await request.json();

  const newWorldPostData = await prisma.post.create({
    data: {
      title,
      content,
      createdAt: createdAt || new Date(),
      countryName,
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
