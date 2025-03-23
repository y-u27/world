import worldPostApiRoute from "./world-posts/index";

const express = require("express");

const app = express();

app.use(express.json());

// ルート設定
app.use("/api", worldPostApiRoute);

// サーバ起動
app.listen(5001);
