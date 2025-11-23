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
//全お知らせデータ取得
router.get("/notice", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const noticeDataId = yield prismaClient_1.default.news.findUnique({
            where: { id },
        });
        //お知らせデータ取得成功
        res.status(200).json({
            success: true,
            message: "お知らせデータ取得成功",
            data: noticeDataId,
        });
    }
    catch (err) {
        console.error("お知らせデータ取得失敗", err);
        res.status(500).json({
            error: "お知らせデータ取得失敗",
        });
        return;
    }
}));
//お知らせデータ作成
router.post("/notice", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, createdAt } = req.body;
    if (!content || !createdAt) {
        res.status(400).json({
            success: false,
            message: "お知らせ内容/日時のどれかが不足しています",
        });
        return;
    }
    const newNewsData = yield prismaClient_1.default.news.create({
        data: {
            content,
            createdAt,
        },
    });
    res.status(200).json({
        success: true,
        message: "作成成功",
        data: newNewsData,
    });
}));
exports.default = router;
