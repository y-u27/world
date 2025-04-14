import prisma from "../../../../lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();
const cors = require("cors");

// ユーザー情報
router.post(
  "/user/:id",
  cors(),
  async (req: Request, res: Response): Promise<void> => {
    const email =
      typeof req.body.email === "string" ? req.body.email : undefined;
    const id = Number(req.query.id);

    if (!email) {
      res.status(400).json({ error: "メールアドレスがありません" });
      return;
    }

    try {
      const getUser = await prisma.user.findUnique({
        where: { email, id },
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
  }
);

// コメントを更新するAPI
router.patch(
  "/user/:id",
  cors(),
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const email =
      typeof req.body.email === "string" ? req.body.email : undefined;
    const comment =
      typeof req.body.comment === "string" ? req.body.comment : undefined;

    if (!comment && !email) {
      res.status(400).json({ error: "メールアドレス・コメントありません" });
      return;
    }

    try {
      const updateComment = await prisma.user.update({
        where: { id, email },
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
  }
);

export default router;
