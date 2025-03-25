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
// GET→〜/api/world-posts：投稿の一覧を取得する
// POST→〜/api/world-posts：投稿を新規作成する
const prismaClient_1 = __importDefault(require("../../../lib/prismaClient"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// 全投稿データを取得
router.get("/world-posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // クエリパラメータから国名を取得
    const countryName = req.query.countryName;
    if (!countryName) {
        res.status(400).json({ error: "countryNameが指定されていません" });
        return;
    }
    const encodedCountryName = countryName;
    // 国名が指定されていない場合はエラーを返す
    if (!encodedCountryName) {
        res.status(404).json({ error: "国名が指定されていません" });
        return;
    }
    // デコードした国名を取得
    const decodedCountryName = decodeURIComponent(encodedCountryName);
    // 作成した投稿データの取得
    const worldPostData = yield prismaClient_1.default.post.findMany({
        where: {
            countryName: decodedCountryName,
        },
        include: {
            user: { select: { image: true, name: true, comment: true } },
        },
    });
    // 取得した投稿データを返す
    res
        .status(200)
        .json({ success: true, message: "投稿データ取得", data: worldPostData });
    return;
}));
// 投稿データの作成
router.post("/world-posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, countryName, userId } = req.body;
    if (!userId) {
        res
            .status(400)
            .json({ success: false, message: "ユーザーIDが指定されていません" });
        return;
    }
    const newWorldPostsData = yield prismaClient_1.default.post.create({
        data: {
            title,
            content,
            countryName,
            userId: Number(userId),
        },
    });
    res
        .status(201)
        .json({ success: true, message: "投稿完了！", data: newWorldPostsData });
    return;
}));
exports.default = router;
