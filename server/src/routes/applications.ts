import { Router } from "express";
import { applications } from "../controllers/index.js";
import { authenticateToken } from "../middleware/auth.js";

const applicationsRouter = Router();

applicationsRouter.post(
  "/add_application",
  authenticateToken,
  applications.addApplication
);

export default applicationsRouter;
