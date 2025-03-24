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
// 〜/api/worldPosts/[id]：特定の投稿を取得する
router.get("/world-posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const id = parseInt(params.id);
    const worldPostDataId = yield prismaClient_1.default.post.findUnique({
        where: { id },
    });
    // 特定の投稿データ取得に失敗した場合
    if (!worldPostDataId) {
        res
            .status(404)
            .json({ success: false, message: "特定の投稿取得に失敗", data: null });
        return;
    }
    // 特定の投稿データ取得に成功した場合
    res.status(200).json({
        success: true,
        message: "特定の投稿取得に成功",
        data: worldPostDataId,
    });
    return;
}));
// 〜/api/worldPosts/[id]：特定の投稿を更新する
router.patch("/world-posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const id = parseInt(params.id);
    const { title, content } = req.body;
    const newWorldPostDataId = yield prismaClient_1.default.post.update({
        where: { id },
        data: { title, content },
    });
    res.status(200).json({
        success: true,
        message: "特定の投稿更新成功",
        data: newWorldPostDataId,
    });
    return;
}));
// 〜/api/worldPosts/[id]：特定の投稿を削除する
router.delete("/world-posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const id = parseInt(params.id);
    yield prismaClient_1.default.post.delete({
        where: { id },
    });
    res
        .status(200)
        .json({ success: true, message: "特定の投稿削除成功", data: null });
    return;
}));
exports.default = router;
