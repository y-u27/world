import prisma from "../../../lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();

//全お知らせデータ取得
router.get("/notice", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    const noticeDataId = await prisma.news.findUnique({
      where: { id },
    });

    //お知らせデータ取得成功
    res.status(200).json({
      success: true,
      message: "お知らせデータ取得成功",
      data: noticeDataId,
    });
  } catch (err) {
    console.error("お知らせデータ取得失敗", err);
    res.status(500).json({
      error: "お知らせデータ取得失敗",
    });
    return;
  }
});
