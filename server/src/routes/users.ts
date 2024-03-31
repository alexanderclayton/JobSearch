import { Router } from "express";
import { users } from "../controllers/index.js";

const usersRouter = Router();

usersRouter.post("/add_user", users.addUser);
usersRouter.put("/update_user", users.updateUser);

export default usersRouter;
