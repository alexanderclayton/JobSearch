import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { IRequest } from "../types/index.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers["authorization"];
  if (!bearerToken) {
    return res.status(401).json({ message: "No JWT provided." });
  }
  if (JWT_SECRET) {
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid JWT." });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(500).json({ message: "Invalid JWT secret key." });
  }
};
