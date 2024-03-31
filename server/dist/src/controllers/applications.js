import mongoose from "mongoose";
import { Application } from "../models/index.js";
export const addApplication = async (req, res) => {
    try {
        const { job, applicationDate, ...optionalFields } = req.body;
        if (!job || !applicationDate) {
            return res.status(400).json({
                message: "New application must include job and application date",
            });
        }
        const newApplication = new Application({
            job,
            applicationDate,
            ...optionalFields,
        });
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    }
    catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: "Validation error:", errors });
        }
        console.error("Error adding application:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
