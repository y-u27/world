import { Request, Response, Router } from "express";
import prisma from "../../../../lib/prismaClient";

const router = Router();

// 〜/api/worldPosts/[id]：特定の投稿を取得する
router.get(
  "/world-posts/:id",
  async (req: Request, res: Response): Promise<void> => {
    const params = req.params;
    const id = parseInt(params.id);

    const worldPostDataId = await prisma.post.findUnique({
      where: { id },
    });

    // 特定の投稿データ取得に失敗した場合
    if (!worldPostDataId) {
      res
        .status(404)
        .json({
          success: false,
          message: "特定の投稿データがありませんでした",
          data: null,
        });
      return;
    }

    // 特定の投稿データ取得に成功した場合
    res.status(200).json({
      success: true,
      message: "特定の投稿取得に成功",
      data: worldPostDataId,
    });
    return;
  }
);

// 〜/api/worldPosts/[id]：特定の投稿を更新する
router.patch(
  "/world-posts/:id",
  async (req: Request, res: Response): Promise<void> => {
    const params = req.params;
    const id = parseInt(params.id);

    const { title, content } = req.body;

    const newWorldPostDataId = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    res.status(200).json({
      success: true,
      message: "特定の投稿更新成功",
      data: newWorldPostDataId,
    });
    return;
  }
);

// 〜/api/worldPosts/[id]：特定の投稿を削除する
router.delete(
  "/world-posts/:id",
  async (req: Request, res: Response): Promise<void> => {
    const params = req.params;
    const id = parseInt(params.id);

    await prisma.post.delete({
      where: { id },
    });
    res
      .status(200)
      .json({ success: true, message: "特定の投稿削除成功", data: null });
    return;
  }
);

export default router;
