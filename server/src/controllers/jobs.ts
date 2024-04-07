import { Request, Response } from "express";
import mongoose from "mongoose";
import { Job } from "../models/index.js";
import { IJob, IRequest, IUser } from "../types/index.js";

export const addJob = async (req: IRequest, res: Response) => {
  try {
    const token = req.user as IUser;
    const userId = token._id;
    const { title, company, ...optionalFields } = req.body;
    if (!title || !company) {
      return res
        .status(400)
        .json({ message: "New job must include a title and company" });
    }
    const newJob = new Job<IJob>({
      userId,
      title,
      company,
      ...optionalFields,
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error adding job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { _id, title, company, compensation, hours, tech, location } =
      req.body;
    if (!_id) {
      return res.status(400).json({ message: "No job with that _id found." });
    }
    const updateFields: Partial<IJob> = {};
    if (title) updateFields.title = title;
    if (company) updateFields.company = company;
    if (compensation) updateFields.compensation = compensation;
    if (hours) updateFields.hours = hours;
    if (tech) updateFields.tech = tech;
    if (location) updateFields.location = location;
    const updatedJob = await Job.findOneAndUpdate({ _id: _id }, updateFields, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) {
      return res.status(400).json({ message: "Unable to update job." });
    }
    res.status(200).json(updatedJob);
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const deletedJob = await Job.findOneAndDelete({ _id: _id });
    res.status(200).json({ message: `Deleted job: ${_id}`, deletedJob });
  } catch (error: unknown) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const fetchedJob = await Job.findById(jobId).exec();
    if (!fetchedJob) {
      return res.status(400).json({ message: "No job with that _id found" });
    }
    res.status(200).json(fetchedJob);
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const queryJobs = async (req: Request, res: Response) => {
  try {
    const { jobs } = req.body;
    if (!jobs) {
      return res
        .status(400)
        .json({ message: "Request must include an array of job _id(s)" });
    }
    const fetchedJobs = await Job.find({ _id: { $in: jobs } }).exec();
    if (!fetchedJobs) {
      return res
        .status(400)
        .json({ message: "No jobs found matching provided _id(s)" });
    }
    res.status(200).json(fetchedJobs);
  } catch (error: unknown) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
