import prisma from "../../../frontend/src/app/lib/prismaClient";
import { Request, Response, Router } from "express";

const router = Router()

// ユーザー情報を取得するAPI
router.get("/user", async (req: Request, res: Response): Promise<void> => {});
