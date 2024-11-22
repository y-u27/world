import prisma from "@/app/lib/prisma/prismaClient";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../../../../lib/auth";

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
