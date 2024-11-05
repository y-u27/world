import prisma from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const worldUserPostData = await prisma.user.findMany();

  return NextResponse.json(
    {
      success: true,
      message: "ユーザーデータ取得",
      data: worldUserPostData,
    },
    {
      status: 200,
    }
  );
}
