import mongoose from "mongoose";
import { User } from "../models/index.js";
import { generateToken } from "../utils/index.js";
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(400)
                .json({ message: "Must include a valid  email and password." });
        }
        const user = await User.findOne({ email: email });
        if (user) {
            if (user.password !== password) {
                res.status(400).json({ message: "Incorrect password." });
            }
            const token = generateToken(user);
            res.status(200).json({ token });
        }
        else {
            res.status(404).json({ message: "No user with that email found." });
        }
    }
    catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: "Validation error:", errors });
        }
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
export const protectedRoute = (req, res) => {
    console.log(req.user);
    console.log("type", typeof req.user);
    const tokenObject = req.user;
    const userId = tokenObject._id;
    console.log("UserId:", userId);
    return res.status(200).json(req.user);
};
