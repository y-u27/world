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
// ユーザー情報
router.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    if (!email) {
        res.status(400).json({ error: "メールアドレスがありません" });
        return;
    }
    res.status(200).json({ data: res });
}));
// コメントを更新するAPI
router.patch("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = typeof req.query.email === "string" ? req.query.email : undefined;
    const comment = typeof req.query.comment === "string" ? req.query.comment : undefined;
    if (!comment) {
        res.status(400).json({ error: "コメントが更新できませんでした" });
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
