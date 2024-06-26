import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/index.js";
import { IRequest, IUser } from "../types/index.js";
import { generateToken } from "../utils/auth.js";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Must include a name, email, and password." });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateUser = async (req: IRequest, res: Response) => {
  try {
    const token = req.user as IUser;
    const userId = token._id;
    const { name, email, password } = req.body;
    const updateFields: Partial<IUser> = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (password) updateFields.password = password;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updateFields,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "Unable to update user" });
    }
    const access_token = generateToken(updatedUser);
    res.status(200).json({ access_token });
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const deletedUser = await User.findOneAndDelete({ _id: _id });
    res.status(200).json({ message: `Deleted user: ${_id}`, deletedUser });
  } catch (error: unknown) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
