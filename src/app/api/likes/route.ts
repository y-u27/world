import prisma from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

//いいねを取得するGET API
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  console.log(request.url);

  const userId = url.searchParams.get("userId");
  const postId = url.searchParams.get("postId");

  if (!userId || !postId) {
    return NextResponse.json(
      {
        success: false,
        message: "userIdまたはpostIdが不足しています",
      },
      { status: 400 }
    );
  }

  //「いいね」取得
  const getLike = await prisma.likes.findMany({
    where: { userId: Number(userId), postId: Number(postId) },
  });

  return NextResponse.json(
    {
      success: true,
      message: "いいね取得成功",
      data: getLike,
    },
    { status: 200 }
  );
}

// いいねを追加するPOST API
export async function POST(request: NextRequest) {
  const { userId, postId } = await request.json();

  console.log("Received userId:", userId, "postId:", postId);

  if (!userId || !postId) {
    return NextResponse.json(
      { error: "userIdかpostIdが見つかりません" },
      { status: 400 }
    );
  }

  const likeSearch = await prisma.likes.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (likeSearch) {
    return NextResponse.json(
      {
        message: "既に「いいね」されています",
      },
      { status: 200 }
    );
  }

  try {
    const like = await prisma.likes.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });
    console.log("「いいね」の作成に成功", like);
    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    console.error("「いいね」の作成に失敗:", error);
    return NextResponse.json(
      { error: "いいねができませんでした" },
      { status: 500 }
    );
  }
}

// いいねを削除するDELETE API
export async function DELETE(request: NextRequest) {
  if (request.headers.get("content-type") !== "application/json") {
    return NextResponse.json(
      {
        success: false,
        message: "無効なリクエスト形式",
      },
      { status: 400 }
    );
  }

  const { userId, postId } = await request.json();

  if (!userId || !postId) {
    return NextResponse.json(
      {
        success: false,
        message: "userIdまたはpostIdが不足しています",
      },
      { status: 400 }
    );
  }

  try {
    const deletedLike = await prisma.likes.deleteMany({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    if (deletedLike.count === 0) {
      return NextResponse.json(
        { success: false, message: "いいねが見つかりません" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "いいねを削除",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("いいねの削除エラー:", error);
    return NextResponse.json(
      { success: false, message: "いいねの削除に失敗" },
      { status: 500 }
    );
  }
}
