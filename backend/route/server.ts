const express = require("express");

const app = express();

app.use(express.json());

// サーバ起動
app.listen(() => {
  console.log(`Server is running on https://world-map-sns.vercel.app`);
});
