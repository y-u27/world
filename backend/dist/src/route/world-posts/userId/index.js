"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../../../../lib/prismaClient"));
const router = (0, express_1.Router)();
//〜/api/worldPosts/userId：ログインしているユーザーが投稿した内容だけを取得する
router.get("/world-posts/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const userPostDataId = yield prismaClient_1.default.post.findMany({
            where: { userId },
            include: {
                user: { select: { image: true, name: true, comment: true } },
            },
        });
        res.status(200).json({
            success: true,
            message: "投稿が見つかりました",
            data: userPostDataId,
        });
    }
    catch (error) {
        console.error("投稿取得失敗（サーバーエラー）", error);
        res.status(500).json({ error: "投稿取得失敗" });
    }
}));
exports.default = router;
