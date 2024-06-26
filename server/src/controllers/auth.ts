import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/index.js";
import { generateToken } from "../utils/index.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Must include a valid email and password." });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password." });
      }
      const access_token = generateToken(user);
      return res.status(200).json({ access_token });
    } else {
      return res
        .status(404)
        .json({ message: "No user with that email found." });
    }
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
