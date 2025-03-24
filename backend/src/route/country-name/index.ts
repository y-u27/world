// expressに書き換え
import prisma from "../../../lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();

// 国名取得API
router.get(
  "/country-name/:countryname",
  async (req: Request, res: Response): Promise<void> => {
    const { countryname } = req.params;

    // countrynameが空欄の場合
    if (!countryname) {
      res
        .status(400)
        .json({ success: false, message: "国名が指定されていません" });
      return;
    }

    // 各国名の投稿データ取得
    const countryNameData = await prisma.post.findMany({
      where: { countryName: countryname },
    });

    // countryNameDataではない、または、countryNameDataの長さが0の場合
    if (!countryNameData || countryNameData.length === 0) {
      res.status(404).json({
        success: false,
        message: "指定された国が見つかりません",
        data: [],
      });
      return;
    }

    // 指定された国名のデータが見つかった場合
    res.status(200).json({
      success: true,
      message: "指定された国のデータが見つかりました",
      data: countryNameData,
    });
  }
);

export default router;
