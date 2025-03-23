"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./world-posts/index"));
const express = require("express");
const app = express();
app.use(express.json());
// ルート設定
app.use("/api", index_1.default);
// サーバ起動
app.listen(5000);
