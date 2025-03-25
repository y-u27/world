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
// expressに書き換え
const prismaClient_1 = __importDefault(require("../../../lib/prismaClient"));
const express_1 = require("express");
const router = (0, express_1.Router)();
//いいねを取得するGET API
router.get("/likes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.query.userId);
    const postId = Number(req.query.postId);
    if (!userId || !postId) {
        res
            .status(400)
            .json({ success: false, message: "userIdまたはpostIdが不足しています" });
        return;
    }
    // いいね取得
    const getLike = yield prismaClient_1.default.likes.findMany({
        where: { userId: Number(userId), postId: Number(postId) },
    });
    res
        .status(200)
        .json({ success: true, message: "いいね取得成功", data: getLike });
    return;
}));
// いいねを追加するPOST API
router.post("/likes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // リクエストボディからデータを取得
    const userId = Number(req.body.userId);
    const postId = Number(req.body.postId);
    if (!userId || !postId) {
        res.status(400).json({ error: "userIdかpostIdが見つかりません" });
        return;
    }
    const likesSearch = yield prismaClient_1.default.likes.findFirst({
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
        const likes = yield prismaClient_1.default.likes.create({
            data: {
                userId: userId,
                postId: postId,
            },
        });
        console.log("「いいね」の作成に成功", likes);
        res.status(201).json(likes);
        return;
    }
    catch (error) {
        console.error("「いいね」の作成に失敗:", error);
        res.status(500).json({ error: "いいねができませんでした" });
        return;
    }
}));
// いいねを削除するDELETE API
router.delete("/likes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId ? Number(req.query.userId) : null;
    const postId = req.query.postId ? Number(req.query.postId) : null;
    if (userId === null || postId === null || isNaN(userId) || isNaN(postId)) {
        res.status(400).json({ error: "userIdまたはpostIdが不足しています" });
        return;
    }
    try {
        const deletedLikes = yield prismaClient_1.default.likes.deleteMany({
            where: {
                userId: userId,
                postId: postId,
            },
        });
        if (deletedLikes.count === 0) {
            res.status(404).json({ message: "いいねが見つかりません" });
            return;
        }
        else {
            res.status(200).json({ message: "いいねを削除" });
            return;
        }
    }
    catch (error) {
        console.error("いいねの削除エラー", error);
        res.status(500).json({ message: "いいねの削除に失敗" });
        return;
    }
}));
exports.default = router;
