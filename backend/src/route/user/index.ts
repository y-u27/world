import prisma from "../../../lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();

// ユーザー情報
router.post("/user", async (req: Request, res: Response): Promise<void> => {
  const email = req.query.email;

  if (!email) {
    res.status(400).json({ error: "メールアドレスがありません" });
    return;
  }

  res.status(200).json({ data: res });
});

// コメントを更新するAPI
router.patch("/user", async (req: Request, res: Response): Promise<void> => {
  const email =
    typeof req.query.email === "string" ? req.query.email : undefined;
  const comment =
    typeof req.query.comment === "string" ? req.query.comment : undefined;

  if (!comment) {
    res.status(400).json({ error: "コメントが更新できませんでした" });
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
