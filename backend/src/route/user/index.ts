import prisma from "../../../lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();

// ユーザー情報
router.post("/user", async (req: Request, res: Response): Promise<void> => {
  const email = typeof req.body.email === "string" ? req.body.email : undefined;

  if (!email) {
    res.status(400).json({ error: "メールアドレスがありません" });
    return;
  }

  try {
    const getUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, image: true, comment: true },
    });
    // ↓getUserがnullであった場合はHTTPステータスコードを400としてユーザーが見つからなかった旨を含める
    if (getUser === null) {
      res.status(400).json({ error: "ユーザーが見つかりません" });
    }
    res.status(200).json({ data: getUser });
    return;
  } catch (error) {
    res.status(500).json({ error: "ユーザー情報取得失敗" });
    return;
  }
});

// コメントを更新するAPI
router.patch("/user", async (req: Request, res: Response): Promise<void> => {
  const email = typeof req.body.email === "string" ? req.body.email : undefined;
  const comment =
    typeof req.query.comment === "string" ? req.query.comment : undefined;

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
