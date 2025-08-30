"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./world-posts/index"));
const index_2 = __importDefault(require("./world-posts/[id]/index"));
const index_3 = __importDefault(require("./user/index"));
const index_4 = __importDefault(require("./likes/index"));
const index_5 = __importDefault(require("./country-name/index"));
const index_6 = __importDefault(require("./register/index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("サーバー起動中...");
const app = (0, express_1.default)();
const port = 5001;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    // ↓フロント側のURLを設定
    origin: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    credentials: true,
    optionsSuccessStatus: 200,
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
    console.log(`サーバーが${process.env.NEXT_PUBLIC_BASE_URL}で起動`);
});
exports.default = app;
