import jwt from "jsonwebtoken";
import "dotenv/config";
import { IUser } from "../types/index.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user: IUser): string | undefined => {
  if (JWT_SECRET) {
    return jwt.sign(user.toObject(), JWT_SECRET, { expiresIn: "1h" });
  }
};
