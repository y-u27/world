// expressに書き換え
import prisma from "../../../frontend/src/app/lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();

//いいねを取得するGET API
router.get("/likes", async (req: Request, res: Response):Promise<void> => {});

// いいねを追加するPOST API
router.post("/likes", async (req: Request, res: Response): Promise<void> => {
  // リクエストボディからデータを取得
  const userId = Number(req.body.userId);
  const postId = Number(req.body.postId);

  if (!userId || !postId) {
    res.status(400).json({ error: "userIdかpostIdが見つかりません" });
    return;
  }

  const likesSearch = await prisma.likes.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (!likesSearch) {
    res.status(200).json({ message: "既に「いいね」されています" });
    return;
  }

  try {
    const likes = await prisma.likes.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });
    console.log("「いいね」の作成に成功", likes);
    res.status(201).json(likes);
    return;
  } catch (error) {
    console.error("「いいね」の作成に失敗:", error);
    res.status(500).json({ error: "いいねができませんでした" });
    return;
  }
});

// いいねを削除するDELETE API
router.delete("/likes", async (req: Request, res: Response) => {
  // 無効なリクエスト形式
  if (req.body.get("content-type") !== "application/json") {
    res.status(400).json({ message: "無効なリクエスト形式" });
    return;
  }

  const userId = Number(req.body.userId);
  const postId = Number(req.body.postId);

  if (!userId || !postId) {
    res.status(400).json({ error: "userIdまたはpostIdが不足しています" });
    return;
  }

  try {
    const deletedLikes = await prisma.likes.deleteMany({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    if (deletedLikes.count === 0) {
      res.status(404).json({ message: "いいねが見つかりません" });
      return;
    } else {
      res.status(200).json({ message: "いいねを削除" });
      return;
    }
  } catch (error) {
    console.error("いいねの削除エラー", error);
    res.status(500).json({ message: "いいねの削除に失敗" });
    return;
  }
});
