import prisma from '@/app/lib/prismaClient';
import { getServerSession, Session } from 'next-auth';
import { handler } from '../auth/[...nextauth]/route';

// ユーザー情報取得API
export async function GET() {
  // セッション情報を取得
  let session: Session | null;
  try {
    session = await getServerSession(handler);

    // 取得できたセッション情報が空の場合は401エラーを返す
    if (!session) {
      return Response.json(
        {
          message: 'ログインしていません',
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    // セッション情報の取得に失敗した場合は500エラーを返す
    return Response.json(
      {
        message: 'セッション情報の取得に失敗しました',
      },
      {
        status: 500,
      }
    );
  }

  // セッション情報からユーザー情報を取得して返す
  try {
    // セッション情報からユーザー情報を取得
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
    // ユーザー情報の取得に失敗した場合は500エラーを返す
    return Response.json(
      {
        message: 'ユーザー情報の取得に失敗しました',
      },
      {
        status: 500,
      }
    );
  }
}
