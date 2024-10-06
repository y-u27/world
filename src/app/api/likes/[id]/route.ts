// いいね機能のapi

import prisma from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";

interface Params {
  id: string;
}

// 特定のいいねデータ取得
export async function GET(request: Request, { params }: { params: Params }) {
  const id = parseInt(params.id);

  const likePostData = await prisma.likes.findUnique({
    where: { id },
  });

  if (!likePostData) {
    return NextResponse.json(
      {
        success: false,
        message: "いいねデータ取得に失敗",
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
      message: "いいねデータ取得に成功しました",
      data: likePostData,
    },
    {
      status: 200,
    }
  );
}

// 特定のいいねデータ作成
export async function POST(request: Request, { params }: { params: Params }) {
  const { userId, postId } = await request.json();

  const newLikePostData = await prisma.likes.create({
    data: {
      userId,
      postId,
    },
  });
  return NextResponse.json(
    {
      success: true,
      message: "いいね！",
      data: newLikePostData,
    },
    {
      status: 201,
    }
  );
}

// いいねデータ削除
export async function DELETE(request: Request, { params }: { params: Params }) {
  const id = parseInt(params.id);

  await prisma.likes.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(
    {
      success: true,
      message: "いいね削除",
      data: null,
    },
    {
      status: 200,
    }
  );
}
