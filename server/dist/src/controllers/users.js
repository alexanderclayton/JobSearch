import mongoose from "mongoose";
import { User } from "../models/index.js";
export const addUser = async (req, res) => {
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
    }
    catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: "Validation error:", errors });
        }
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { _id, name, email, password, applicationId } = req.body;
        if (!_id) {
            return res.status(400).json({ message: "No user with that _id found" });
        }
        const updateFields = {};
        if (name)
            updateFields.name = name;
        if (email)
            updateFields.email = email;
        if (password)
            updateFields.password = password;
        if (applicationId)
            updateFields.$push = { applications: applicationId };
        const updatedUser = await User.findOneAndUpdate({ _id: _id }, updateFields, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(400).json({ message: "Unable to update user" });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: "Validation error:", errors });
        }
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
