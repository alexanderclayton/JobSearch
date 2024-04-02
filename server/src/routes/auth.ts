import { Router } from "express";
import { auth } from "../controllers/index.js";
import { authenticateToken } from "../middleware/auth.js";

const authRouter = Router();

authRouter.post("/login", auth.login);

export default authRouter;
