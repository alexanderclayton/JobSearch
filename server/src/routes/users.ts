import { Router } from "express";
import { users } from "../controllers/index.js";
import { authenticateToken } from "../middleware/auth.js";

const usersRouter = Router();

usersRouter.post("/add_user", users.addUser);
usersRouter.put("/update_user", authenticateToken, users.updateUser);
usersRouter.delete("/delete_user", authenticateToken, users.deleteUser);

export default usersRouter;
