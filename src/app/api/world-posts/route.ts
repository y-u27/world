// GET→〜/api/world-posts：投稿の一覧を取得する
// POST→〜/api/world-posts：投稿を新規作成する

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma/prismaClient";

// 全投稿データを取得
export async function GET(request: NextRequest) {
  // クエリパラメータから国名を取得
  const searchParams = request.nextUrl.searchParams;
  // TIPS: クエリパラメータはURIエンコードされているため、デコードして取得する必要がある
  // TIPS：URIエンコードとはセキュリティなどの理由でURIに使用できない文字を変換すること
  // TIPS：デコードとはURIエンコードされた文字列を元に戻すこと
  const encodedCountryName = searchParams.get("country-name");
  // 国名が指定されていない場合はエラーを返す
  if (!encodedCountryName)
    return NextResponse.json(
      {
        success: false,
        message: "国名が指定されていません",
      },
      {
        status: 400,
      }
    );
  // デコードした国名を取得
  const decodedCountryName = decodeURIComponent(encodedCountryName);
  const worldPostData = await prisma.post.findMany({
    where: {
      countryName: decodedCountryName,
    },
    include: {
      user: { select: { image: true, name: true } },
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
export async function POST(request: NextRequest) {
  const { title, content, countryName, userId } = await request.json();

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: "ユーザーIDが指定されていません",
      },
      {
        status: 400,
      }
    );
  }

  const newWorldPostData = await prisma.post.create({
    data: {
      title,
      content,
      countryName,
      userId: Number(userId),
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
