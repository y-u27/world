import worldPostApiRoute from "./world-posts/index";

const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.json());

// セッション設定
app.use(session({}));

// ルート設定
app.use("/api", worldPostApiRoute);

// サーバ起動
app.listen(5000);
