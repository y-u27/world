// GET→〜/api/worldPosts/[id]：特定の投稿を取得する
// PUT→〜/api/worldPosts/[id]：特定の投稿を更新する
// DELETE→〜/api/worldPosts/[id]：特定の投稿を削除する

import prisma from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";

interface Params {
  id: string;
}

// 特定の投稿データの取得
export async function GET(request: Request, { params }: { params: Params }) {
  const id = parseInt(params.id);

  const worldPostData = await prisma.post.findUnique({
    where: { id },
  });

  if (!worldPostData) {
    return NextResponse.json(
      {
        success: false,
        message: "投稿データ取得に失敗しました",
        data: null,
      },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json(
    {
      success: true,
      message: "投稿データ取得に成功しました",
      data: worldPostData,
    },
    {
      status: 200,
    }
  );
}

// 特定の投稿データの更新
export async function PATCH(request: Request, { params }: { params: Params }) {
  const id = parseInt(params.id);

  const { title, content, createdAt } = await request.json();

  const newWorldPostData = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      createdAt,
    },
  });
  return NextResponse.json(
    {
      success: true,
      message: "投稿更新",
      data: newWorldPostData,
    },
    {
      status: 200,
    }
  );
}

// 特定の投稿削除
export async function DELETE(request: Request, { params }: { params: Params }) {
  const id = parseInt(params.id);

  await prisma.post.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(
    {
      success: true,
      message: "投稿削除",
      data: null,
    },
    {
      status: 200,
    }
  );
}
