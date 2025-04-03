import prisma from "../../../lib/prismaClient";
import { Request, Response, Router } from "express";
import bycrypt from "bcrypt";

const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, image } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ message: "メールアドレスとパスワード登録が必要です" });
    return;
  }

  try {
    const hashePassword = await bycrypt.hash(password, 0);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashePassword,
        image: image || "",
      },
    });
    res.status(200).json({ user: newUser });
    return;
  } catch (error) {
    res.status(500).json({ message: "登録できませんでした,error" });
    return;
  }
});

export default router;
