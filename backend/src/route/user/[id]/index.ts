import prisma from "../../../../lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();
const cors = require("cors");

router.post(
  "/user:id",
  cors(),
  async (req: Request, res: Response): Promise<void> => {
    const email =
      typeof req.body.email === "string" ? req.body.email : undefined;

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
  }
);
