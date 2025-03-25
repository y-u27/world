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
// 国名取得API
router.get("/country-name/:countryname", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { countryname } = req.params;
    // countrynameが空欄の場合
    if (!countryname) {
        res
            .status(400)
            .json({ success: false, message: "国名が指定されていません" });
        return;
    }
    // 各国名の投稿データ取得
    const countryNameData = yield prismaClient_1.default.post.findMany({
        where: { countryName: countryname },
    });
    // countryNameDataではない、または、countryNameDataの長さが0の場合
    if (!countryNameData || countryNameData.length === 0) {
        res.status(404).json({
            success: false,
            message: "指定された国が見つかりません",
            data: [],
        });
        return;
    }
    // 指定された国名のデータが見つかった場合
    res.status(200).json({
        success: true,
        message: "指定された国のデータが見つかりました",
        data: countryNameData,
    });
}));
exports.default = router;
