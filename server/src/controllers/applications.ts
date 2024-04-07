import { Request, Response, application } from "express";
import mongoose from "mongoose";
import { Application } from "../models/index.js";
import { IApplication } from "../types/applications.js";
import { IUser } from "../types/users.js";
import { IRequest } from "../types/auth.js";

export const addApplication = async (req: IRequest, res: Response) => {
  try {
    const token = req.user as IUser;
    const userId = token._id;
    const { jobId, applicationDate, ...optionalFields } = req.body;
    if (!jobId || !applicationDate) {
      return res.status(400).json({
        message: "New application must include job and application date",
      });
    }
    const newApplication = new Application<IApplication>({
      userId,
      jobId,
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
      return res
        .status(400)
        .json({ message: "No application with that _id found." });
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
    const deletedApplication = await Application.findOneAndDelete({ _id: _id });
    res
      .status(200)
      .json({ message: `Deleted application: ${_id}`, deletedApplication });
  } catch (error: unknown) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getApplication = async (req: Request, res: Response) => {
  try {
    const applicationId = req.params.id;
    const fetchedApplication = await Application.findById(applicationId).exec();
    if (!fetchedApplication) {
      res.status(400).json({ message: "No application with that _id found" });
    }
    res.status(200).json(fetchedApplication);
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const queryApplications = async (req: IRequest, res: Response) => {
  try {
    const token = req.user as IUser;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Must have an authorized user token" });
    }
    const fetchedApplications = await Application.find({
      userId: token._id,
    }).exec();
    if (!fetchedApplications) {
      return res
        .status(400)
        .json({ message: "No applications found with that user._id" });
    }
    res.status(200).json(fetchedApplications);
  } catch (error: unknown) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
