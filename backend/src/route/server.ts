import express from "express";
import cors from "cors";
import worldPostApi from "./world-posts/index";
import worldPostListApi from "./world-posts/[id]/index";
import userApi from "./user/index";
import likeApi from "./likes/index";
import countryNameApi from "./country-name/index";
import registerApi from "./register/index";
import dotenv from "dotenv";
dotenv.config();

console.log("サーバー起動中...");

const app = express();
const port = 5001;

app.use(express.json());
app.use(
  cors({
    origin: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ルート設定
app.use("/api", worldPostApi);
app.use("/api", worldPostListApi);
app.use("/api", userApi);
app.use("/api", likeApi);
app.use("/api", countryNameApi);
app.use("/api", registerApi);

// サーバ起動
app.listen(port, () => {
  console.log(`サーバーが${process.env.NEXT_PUBLIC_BASE_URL}で起動しました`);
});

export default app;
