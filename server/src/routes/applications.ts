import { Router } from "express";
import { applications } from "../controllers/index.js";
import { authenticateToken } from "../middleware/auth.js";

const applicationsRouter = Router();

applicationsRouter.post(
  "/add_application",
  authenticateToken,
  applications.addApplication
);

applicationsRouter.put(
  "/update_application",
  authenticateToken,
  applications.updateApplication
);

applicationsRouter.delete(
  "/delete_application",
  authenticateToken,
  applications.deleteApplication
);

export default applicationsRouter;
