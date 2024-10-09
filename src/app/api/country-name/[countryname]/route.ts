// 国名取得API

import prisma from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { countryname: string } }
) {
  const { countryname } = params;

  const countryNameData = await prisma.post.findMany({
    where: { countryName: countryname },
  });
}
