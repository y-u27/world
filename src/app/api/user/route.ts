import prisma from "@/app/lib/prismaClient";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/lib/auth";

// ユーザー情報を取得するAPI
export async function GET() {
  // セッション情報取得
  let session: Session | null;
  try {
    session = await getServerSession(authOptions);

    // 取得できたセッション情報が空の場合→401エラーを返す
    if (!session) {
      return Response.json(
        {
          message: "ログインしていません",
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    // セッション情報の取得に失敗した場合→500エラーを返す
    return Response.json(
      {
        message: "セッション情報の取得に失敗",
      },
      {
        status: 500,
      }
    );
  }

  // セッション情報からユーザー情報取得
  try {
    // セッション情報からユーザー情報を取得して返す
    const res = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: { id: true, email: true, name: true, image: true, comment: true },
    });
    return Response.json(
      {
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "ユーザー情報取得に失敗",
      },
      {
        status: 500,
      }
    );
  }
}

//コメントを更新するAPI
export async function PATCH(req: Request) {
  let session: Session | null;
  try {
    session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { message: "ログインしていません" },
        { status: 401 }
      );
    }
  } catch (error) {
    return Response.json(
      { message: "セッション情報の取得失敗" },
      { status: 500 }
    );
  }

  try {
    const { comment } = await req.json();
    const updateUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { comment },
    });
    return Response.json({ data: updateUser }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "コメント更新失敗" }, { status: 500 });
  }
}
