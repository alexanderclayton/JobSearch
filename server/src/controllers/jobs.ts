import { Request, Response } from "express";
import { IJob, Job } from "../models.js";
import mongoose from "mongoose";

export const addJob = async (req: Request, res: Response) => {
  try {
    const { user, title, company, ...optionalFields } = req.body;
    console.log("Req.body:", req.body, user, title, company);
    if (!user || !title || !company) {
      return res
        .status(400)
        .json({ message: "New job must include a user, title, and company" });
    }
    const newJob = new Job({
      user,
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
          return res.status(400).json({ message: "No job with that _id found" });
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
          return res.status(400).json({ message: "Unable to update job" });
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
