import prisma from "../../../lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();

//全お知らせデータ取得
router.get("/notice", async (req: Request, res: Response): Promise<void> => {
  try {
    const noticeDataAll = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });

    //お知らせデータ取得成功
    res.status(200).json({
      success: true,
      message: "お知らせデータ取得成功",
      data: noticeDataAll,
    });
  } catch (err) {
    console.error("お知らせデータ取得失敗", err);
    res.status(500).json({
      error: "お知らせデータ取得失敗",
    });
    return;
  }
});

//お知らせデータ作成
router.post("/notice", async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body;

  if (!content) {
    res.status(400).json({
      success: false,
      message: "お知らせ内容が不足しています",
    });
    return;
  }

  const newNewsData = await prisma.news.create({
    data: {
      content
    },
  });
  res.status(200).json({
    success: true,
    message: "作成成功",
    data: newNewsData,
  });
});

export default router;
