import prisma from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  userId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const userId = parseInt(params.userId);

  const worldUserPostData = await prisma.post.findMany({
    where: { userId },
    include: {
      user: true,
    },
  });

  if (!worldUserPostData || worldUserPostData.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "ユーザーデータ取得成功",
        data: worldUserPostData,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "ユーザーデータ取得失敗",
      data: worldUserPostData,
    },
    { status: 200 }
  );
}
