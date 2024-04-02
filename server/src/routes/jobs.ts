import { Router } from "express";
import { jobs } from "../controllers/index.js";
import { authenticateToken } from "../middleware/index.js";

const jobsRouter = Router();

jobsRouter.post("/add_job", authenticateToken, jobs.addJob);
jobsRouter.put("/update_job", authenticateToken, jobs.updateJob);
jobsRouter.delete("/delete_job", authenticateToken, jobs.deleteJob);
jobsRouter.get("/:id", authenticateToken, jobs.getJob);
jobsRouter.get("/", authenticateToken, jobs.queryJobs);

export default jobsRouter;
