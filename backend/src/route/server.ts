import worldPostApi from "./world-posts/index";
import worldPostListApi from "./world-posts/[id]/index";
import userApi from "./user/index";
import likeApi from "./likes/index";
import countryNameApi from "./country-name/index";
import dotenv from "dotenv";
dotenv.config();

const express = require("express");

console.log("サーバー起動中...");

const app = express();

app.use(express.json());

// ルート設定
app.use("/api", worldPostApi);
app.use("/api", worldPostListApi);
app.use("/api", userApi);
app.use("/api", likeApi);
app.use("/api", countryNameApi);

// サーバ起動
app.listen(5000, () => {
  console.log("サーバーがhttp://localhost:5000で起動しました");
});
