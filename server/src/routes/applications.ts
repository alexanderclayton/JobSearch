import { Router } from "express";
import { applications } from "../controllers/index.js";

const applicationsRouter = Router();

applicationsRouter.post("/add_application", applications.addApplication);

export default applicationsRouter;
