// GET→〜/api/world-posts：投稿の一覧を取得する
// POST→〜/api/world-posts：投稿を新規作成する
import prisma from "../../../lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();

// 全投稿データを取得
router.get(
  "/world-posts",
  async (req: Request, res: Response): Promise<void> => {
    // クエリパラメータから国名を取得
    const countryName = req.query.countryName as string | undefined;

    if (!countryName) {
      res.status(400).json({ error: "countryNameが指定されていません" });
      return;
    }

    const encodedCountryName = countryName;

    // 国名が指定されていない場合はエラーを返す
    if (!encodedCountryName) {
      res.status(404).json({ error: "国名が指定されていません" });
      return;
    }

    // デコードした国名を取得
    const decodedCountryName = decodeURIComponent(encodedCountryName);

    // 作成した投稿データの取得
    const worldPostData = await prisma.post.findMany({
      where: {
        countryName: decodedCountryName,
      },
      include: {
        user: { select: { image: true, name: true, comment: true } },
      },
    });
    // 取得した投稿データを返す
    res
      .status(200)
      .json({ success: true, message: "投稿データ取得", data: worldPostData });
    return;
  }
);

// 投稿データの作成
router.post(
  "/world-posts",
  async (req: Request, res: Response): Promise<void> => {
    const { title, content, countryName, userId } = req.body;

    if (!userId || !title || !content || !countryName) {
      res
        .status(400)
        .json({
          success: false,
          message: "userId/タイトル/投稿内容/国名のどれかが不足しています",
        });
      return;
    }

    const newWorldPostsData = await prisma.post.create({
      data: {
        title,
        content,
        countryName,
        userId: Number(userId),
      },
    });
    res
      .status(201)
      .json({ success: true, message: "投稿完了！", data: newWorldPostsData });
    return;
  }
);

export default router;
