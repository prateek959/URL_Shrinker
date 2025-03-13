import { connectToDatabase } from "./dbConnection.js";
import { userRouter } from "./routes/user.router.js";
import {urlRouter} from "./routes/url.router.js"
import { redis } from "./redisConnection.js";
import cookieParser from "cookie-parser"
import express from "express";
import cron from "node-cron";
import cors from "cors";
import "dotenv/config";
import analyticsRouter from "./routes/analytics.routes.js";

const app = express();
const PORT = process.env.PORT;

// const frontendUrl = "https://url-shrinker-25.netlify.app";
const frontendUrl = ["http://127.0.0.1:5500", 'https://url-shrinker-myls.onrender.com/'];

const corsOptions = {
  origin: frontendUrl,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

cron.schedule("0 0 0 * * *", async () => {
  const counter = await redis.get("counter");
  await redis.flushdb();
  await redis.set("counter", counter);
},{timezone: "Asia/Kolkata"})

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/user", userRouter);
app.use(urlRouter);
app.use('/api',analyticsRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running at http://localhost:${PORT}`);
});
