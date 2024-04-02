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
export const updateApplication = async (req, res) => {
    try {
        const { _id, applicationDate, resume, coverLetter, feedback, followUp, notes, } = req.body;
        if (!_id) {
            return res
                .status(400)
                .json({ message: "No application with that _id found." });
        }
        const updateFields = {};
        if (applicationDate)
            updateFields.applicationDate = applicationDate;
        if (resume)
            updateFields.resume = resume;
        if (coverLetter)
            updateFields.coverLetter = coverLetter;
        if (feedback)
            updateFields.feedback = feedback;
        if (followUp)
            updateFields.followUp = followUp;
        if (notes)
            updateFields.notes = notes;
        const updatedApplication = await Application.findOneAndUpdate({ _id: _id }, updateFields, {
            new: true,
            runValidators: true,
        });
        if (!updatedApplication) {
            return res.status(400).json({ message: "Unable to update application." });
        }
        res.status(200).json(updatedApplication);
    }
    catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: "Validation error:", errors });
        }
        console.error("Error updating application:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
export const deleteApplication = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedApplication = await Application.findOneAndDelete({ _id: _id });
        res
            .status(200)
            .json({ message: `Deleted application: ${_id}`, deletedApplication });
    }
    catch (error) {
        console.error("Error deleting application:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
export const getApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const fetchedApplication = await Application.findById(applicationId).exec();
        if (!fetchedApplication) {
            res.status(400).json({ message: "No application with that _id found" });
        }
        res.status(200).json(fetchedApplication);
    }
    catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: "Validation error:", errors });
        }
        console.error("Error fetching application:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
export const queryApplications = async (req, res) => {
    try {
        const { applications } = req.body;
        if (!applications) {
            return res
                .status(400)
                .json({ message: "Request must include an array of job _id(s)" });
        }
        const fetchedApplications = await Application.find({
            _id: { $in: applications },
        }).exec();
        if (!fetchedApplications) {
            return res
                .status(400)
                .json({ message: "No applications found matching provided _id(s)" });
        }
        res.status(200).json(fetchedApplications);
    }
    catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
