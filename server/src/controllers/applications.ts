import { Request, Response, application } from "express";
import mongoose from "mongoose";
import { Application } from "../models/index.js";
import { IApplication } from "../types/applications.js";

export const addApplication = async (req: Request, res: Response) => {
  try {
    const { job, applicationDate, ...optionalFields } = req.body;
    if (!job || !applicationDate) {
      return res.status(400).json({
        message: "New application must include job and application date",
      });
    }
    const newApplication = new Application<IApplication>({
      job,
      applicationDate,
      ...optionalFields,
    });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error adding application:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateApplication = async (req: Request, res: Response) => {
  try {
    const {
      _id,
      applicationDate,
      resume,
      coverLetter,
      feedback,
      followUp,
      notes,
    } = req.body;
    if (!_id) {
      res.status(400).json({ message: "No application with that _id found." });
    }
    const updateFields: Partial<IApplication> = {};
    if (applicationDate) updateFields.applicationDate = applicationDate;
    if (resume) updateFields.resume = resume;
    if (coverLetter) updateFields.coverLetter = coverLetter;
    if (feedback) updateFields.feedback = feedback;
    if (followUp) updateFields.followUp = followUp;
    if (notes) updateFields.notes = notes;
    const updatedApplication = await Application.findOneAndUpdate(
      { _id: _id },
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedApplication) {
      return res.status(400).json({ message: "Unable to update application." });
    }
    res.status(200).json(updatedApplication);
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error updating application:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const deletedApplication = await Application.deleteOne({ _id: _id });
    res
      .status(200)
      .json({ message: `Deleted application: ${_id}`, deletedApplication });
  } catch (error: unknown) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
