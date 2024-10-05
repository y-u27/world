// いいね機能のapi

import prisma from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";

// いいねデータ取得
export async function GET() {
  try {
    const likePostData = await prisma.likes.findMany({
      include: {
        user: true,
        post: true,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "いいねデータ取得",
        data: likePostData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "いいねデータ取得失敗",
      },
      {
        status: 200,
      }
    );
  }
}

// いいねデータ作成
export async function POST(request: Request) {
  const { userId, postId } = await request.json();

  const newLikePostData = await prisma.likes.create({
    data: {
      userId,
      postId,
    }
  })
  return NextResponse.json(
    {
      success: true,
      message: "いいね！",
      data: newLikePostData,
    },
    {
      status: 201,
    }
  ) 
}
