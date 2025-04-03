import worldPostApi from "./world-posts/index";
import worldPostListApi from "./world-posts/[id]/index";
import userApi from "./user/index";
import likeApi from "./likes/index";
import countryNameApi from "./country-name/index";
import registerApi from "./register/index";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const express = require("express");

console.log("サーバー起動中...");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// ルート設定
app.use("/api", worldPostApi);
app.use("/api", worldPostListApi);
app.use("/api", userApi);
app.use("/api", likeApi);
app.use("/api", countryNameApi);
app.use("/api", registerApi);

// サーバ起動
app.listen(port, () => {
  console.log(`サーバーがhttp://localhost:${port}で起動しました`);
});

export default app;
