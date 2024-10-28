import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismaClient";
// ↓bcrypt:パスワード暗号化
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { email, password, name, image } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "メールアドレスとパスワード登録が必要です" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        image: image || "",
      },
    });
    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("登録できませんでした", error);
    return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });
  }
}
