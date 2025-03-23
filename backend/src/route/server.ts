import worldPostApi from "./world-posts/index";
import worldPostListApi from "./world-posts/[id]/index";

const express = require("express");

const app = express();

app.use(express.json());

// ルート設定
app.use("/api", worldPostApi);
app.use("/api", worldPostListApi);

// サーバ起動
app.listen(5001);
