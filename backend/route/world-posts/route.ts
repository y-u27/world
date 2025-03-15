// expressに書き換え
// GET→〜/api/world-posts：投稿の一覧を取得する
// POST→〜/api/world-posts：投稿を新規作成する
import prisma from "../../../frontend/src/app/lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();

// 全投稿データを取得
router.get("/post", async (req: Request, res: Response) => {
  // クエリパラメータから国名を取得
  const countryParams = await req.query.countryName;
});

// 投稿データの作成
router.post("/post", async (req: Request, res: Response): Promise<void> => {
  const { title, content, countryName, userId } = req.body;

  if (!userId) {
    res
      .status(400)
      .json({ success: false, message: "ユーザーIDが指定されていません" });
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
});
