import { Request, Response, Router } from "express";
import prisma from "../../../../lib/prismaClient";

const router = Router();

// 〜/api/worldPosts/[id]：特定の投稿を取得する
router.get(
  "/world-posts/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      const worldPostDataId = await prisma.post.findUnique({
        where: { id },
      });

      // 特定の投稿データ取得に失敗した場合
      if (!worldPostDataId) {
        res.status(404).json({
          success: false,
          message: "投稿データがありませんでした",
          data: null,
        });
        return;
      }

      // 特定の投稿データ取得に成功した場合
      res.status(200).json({
        success: true,
        message: "投稿取得成功",
        data: worldPostDataId,
      });
      return;
    } catch (error) {
      console.error("投稿取得失敗（サーバーエラー）", error);
      res.status(500).json({ error: "投稿取得失敗" });
      return;
    }
  }
);

// 〜/api/worldPosts/[id]：投稿を更新する
router.patch(
  "/world-posts/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const countryName = req.query.countryName as string;
      const { title, content, userId } = req.body;

      const newWorldPostDataId = await prisma.post.update({
        where: { id, userId },
        data: { title, content, countryName },
      });

      if (!newWorldPostDataId) {
        res.status(404).json({ error: "投稿更新失敗" });
        return;
      }

      res.status(200).json({
        success: true,
        message: "投稿更新成功",
        data: newWorldPostDataId,
      });
      return;
    } catch (error) {
      console.error("投稿更新失敗（サーバーエラー）", error);
      res.status(500).json({ error: "投稿更新失敗" });
      return;
    }
  }
);

// 〜/api/worldPosts/[id]：投稿を削除する
router.delete(
  "/world-posts/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.body.userId;

      const worldPostDataDelete = await prisma.post.delete({
        where: { id, userId },
      });

      if (!worldPostDataDelete) {
        res.status(404).json({ error: "投稿削除失敗" });
        return;
      }

      res
        .status(200)
        .json({ success: true, message: "投稿削除成功", data: null });
      return;
    } catch (error) {
      console.error("投稿削除失敗（サーバーエラー）", error);
      res.status(500).json({ error: "投稿削除失敗" });
      return;
    }
  }
);

export default router;
