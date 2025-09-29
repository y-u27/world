import { Request, Response, Router } from "express";
import prisma from "../../../../lib/prismaClient";

const router = Router();

//〜/api/worldPosts/userId：ログインしているユーザーが投稿した内容だけを取得する
router.get(
  "/world-posts/userId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);

      const userPostDataId = await prisma.post.findMany({
        where: { userId },
      });

      if (!userPostDataId) {
        res.status(404).json({
          success: false,
          message: "未投稿です",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "投稿が見つかりました",
        data: userPostDataId,
      });
      return;
    } catch (error) {
      console.error("投稿取得失敗（サーバーエラー）", error);
      res.status(500).json({ error: "投稿取得失敗" });
      return;
    }
  }
);
