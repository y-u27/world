import prisma from "../../../frontend/src/app/lib/prismaClient";
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
// router.patch("/user", async (req: Request, res: Response): Promise<void> => {
//   const { email, comment } = req.query;

//   if (!comment) {
//     res.status(400).json({ error: "コメントが更新できませんでした" });
//     return;
//   }

//   const updateComment = await prisma.user.update({
//     data: { comment },
//   });
//   res.status(200).json({
//     success: true,
//     message: "コメントを更新できました",
//     data: updateComment,
//   });
//   return;
// });
