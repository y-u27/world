//ユーザーページの「投稿記事」の編集・削除機能追加
//patch、deleteメソッドにて処理を追加する

import { Request, Response, Router } from "express";
import prisma from "../../../../lib/prismaClient";

const router = Router();

//〜/api/worldPosts/userId：ログインしているユーザーが投稿した内容だけを取得する
router.get(
  "/world-posts/userId/:userId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);

      const userPostDataId = await prisma.post.findMany({
        where: { userId },
        include: {
          user: { select: { image: true, name: true, comment: true } },
        },
      });

      res.status(200).json({
        success: true,
        message: "投稿が見つかりました",
        data: userPostDataId,
      });
    } catch (error) {
      console.error("投稿取得失敗（サーバーエラー）", error);
      res.status(500).json({ error: "投稿取得失敗" });
    }
  }
);

export default router;