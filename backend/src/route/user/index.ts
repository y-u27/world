import prisma from "../../../lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();

// ユーザー情報：登録時
router.post("/user", async (req: Request, res: Response): Promise<void> => {
  const email = typeof req.body.email === "string" ? req.body.email : undefined;

  if (!email) {
    res.status(400).json({ error: "メールアドレスがありません" });
    return;
  }

  try {
    const getUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        comment: true,
      },
    });
    // ↓getUserがnullであった場合はHTTPステータスコードを400としてユーザーが見つからなかった旨を含める
    if (getUser === null) {
      res.status(400).json({ error: "ユーザーが見つかりません" });
    }
    res.status(200).json(getUser);
    return;
  } catch (error) {
    res.status(500).json({ error: "ユーザー情報取得失敗" });
    return;
  }
});

//画像を更新するAPI
router.patch("/user/image", async (req: Request, res: Response): Promise<void> => {
  const email = typeof req.body.email === "string" ? req.body.email : null;
  const image = typeof req.body.image === "string" ? req.body.image : null;

  if (!email || !image) {
    res.status(400).json({ error: "emailまたはimageがありません" });
    return;
  }

  try {
    const updateImage = await prisma.user.update({
      where: { email },
      data: { image },
    });
    res.status(200).json({
      success: true,
      message: "プロフィール画像を更新しました",
      data: updateImage,
    });
  } catch (error) {
    res.status(500).json({ error: "プロフィール画像更新処理に失敗しました" });
  }
});

// コメントを更新するAPI
router.patch("/user", async (req: Request, res: Response): Promise<void> => {
  const email = typeof req.body.email === "string" ? req.body.email : undefined;
  const comment =
    typeof req.body.comment === "string" ? req.body.comment : undefined;

  if (!comment && !email) {
    res.status(400).json({ error: "メールアドレス・コメントありません" });
    return;
  }

  try {
    const updateComment = await prisma.user.update({
      where: { email },
      data: { comment },
    });
    res.status(200).json({
      success: true,
      message: "コメントを更新できました",
      data: updateComment,
    });
  } catch (error) {
    res.status(500).json({ error: "コメント更新処理に失敗しました" });
  }
});

export default router;
