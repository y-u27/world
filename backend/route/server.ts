import worldPostApiRoute from "./world-posts/route";

const express = require("express");

const app = express();

app.use(express.json());

// ルート設定
app.use("/api", worldPostApiRoute);

// サーバ起動
app.listen(() => {
  console.log(`Server is running on https://world-map-sns.vercel.app`);
});
