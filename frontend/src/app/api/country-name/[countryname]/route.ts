// 国名取得API
import prisma from "../../../lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { countryname: string } }
) {
  const { countryname } = context.params;

  const countryNameData = await prisma.post.findMany({
    where: { countryName: countryname },
  });

  if (!countryNameData || countryNameData.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "指定された国が見つかりません",
        data: [],
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "指定された国のデータ取得成功",
      data: countryNameData,
    },
    { status: 200 }
  );
}
