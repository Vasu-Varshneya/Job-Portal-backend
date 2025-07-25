import express from "express";
import dbconnection from "../database/dbconnection.js";
import jobRouter from "../routes/jobRoutes.js";
import userRouter from "../routes/userRoutes.js";
import applicationRouter from "../routes/applicationRoutes.js";
import { config } from "dotenv";

import cors from "cors";
import { errorMiddleware } from "../middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [`https://job-portal-frontend-self-nine.vercel.app`],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application",applicationRouter)
dbconnection();
app.all('/api/cron-run', (req, res) => {
  console.log('Method:', req.method);
  res.send('OK');
});
app.use(errorMiddleware);
export default app;
