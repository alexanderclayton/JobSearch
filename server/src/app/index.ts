import express from "express";
import cors from "cors";
import {
  applicationsRouter,
  authRouter,
  jobsRouter,
  usersRouter,
} from "../routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/users", usersRouter);

export default app;
