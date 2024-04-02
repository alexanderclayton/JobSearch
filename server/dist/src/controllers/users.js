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
        const token = req.user;
        const userId = token._id;
        const { name, email, password, jobs, applications } = req.body;
        const updateFields = {};
        if (name)
            updateFields.name = name;
        if (email)
            updateFields.email = email;
        if (password)
            updateFields.password = password;
        if (jobs)
            updateFields.jobs = jobs;
        if (applications)
            updateFields.applications = applications;
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateFields, { new: true, runValidators: true });
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
export const deleteUser = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedUser = await User.findOneAndDelete({ _id: _id });
        res.status(200).json({ message: `Deleted user: ${_id}`, deletedUser });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
