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
const prismaClient_1 = __importDefault(require("../../../lib/prismaClient"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// ユーザー情報：登録時
router.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = typeof req.body.email === "string" ? req.body.email : undefined;
    if (!email) {
        res.status(400).json({ error: "メールアドレスがありません" });
        return;
    }
    try {
        const getUser = yield prismaClient_1.default.user.findUnique({
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
    }
    catch (error) {
        res.status(500).json({ error: "ユーザー情報取得失敗" });
        return;
    }
}));
//画像を更新するAPI
router.patch("/user/image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = typeof req.body.email === "string" ? req.body.email : null;
    const image = typeof req.body.image === "string" ? req.body.image : null;
    if (!email || !image) {
        res.status(400).json({ error: "emailまたはimageがありません" });
        return;
    }
    try {
        const updateImage = yield prismaClient_1.default.user.update({
            where: { email },
            data: { image },
        });
        res.status(200).json({
            success: true,
            message: "プロフィール画像を更新しました",
            data: updateImage,
        });
    }
    catch (error) {
        res.status(500).json({ error: "プロフィール画像更新処理に失敗しました" });
    }
}));
// コメントを更新するAPI
router.patch("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = typeof req.body.email === "string" ? req.body.email : undefined;
    const comment = typeof req.body.comment === "string" ? req.body.comment : undefined;
    if (!comment && !email) {
        res.status(400).json({ error: "メールアドレス・コメントありません" });
        return;
    }
    try {
        const updateComment = yield prismaClient_1.default.user.update({
            where: { email },
            data: { comment },
        });
        res.status(200).json({
            success: true,
            message: "コメントを更新できました",
            data: updateComment,
        });
    }
    catch (error) {
        res.status(500).json({ error: "コメント更新処理に失敗しました" });
    }
}));
exports.default = router;
