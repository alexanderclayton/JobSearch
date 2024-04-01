import { Router } from "express";
import { jobs } from "../controllers/index.js";
import { authenticateToken } from "../middleware/index.js";

const jobsRouter = Router();

jobsRouter.post("/add_job", jobs.addJob);
jobsRouter.put("/update_job", authenticateToken, jobs.updateJob);

export default jobsRouter;
