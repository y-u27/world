"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./world-posts/index"));
const index_2 = __importDefault(require("./world-posts/[id]/index"));
const index_3 = __importDefault(require("./user/index"));
const index_4 = __importDefault(require("./likes/index"));
const index_5 = __importDefault(require("./country-name/index"));
const index_6 = __importDefault(require("./register/index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express = require("express");
console.log("サーバー起動中...");
const app = express();
const port = 5001;
const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin: "https://world-frontend.vercel.app",
    credentials: true,
    optionSuccessStatus: 200,
}));
// ルート設定
app.use("/api", index_1.default);
app.use("/api", index_2.default);
app.use("/api", index_3.default);
app.use("/api", index_4.default);
app.use("/api", index_5.default);
app.use("/api", index_6.default);
// サーバ起動
app.listen(port, () => {
    console.log(`サーバーがhttps://world-frontend.vercel.appで起動しました`);
});
exports.default = app;
