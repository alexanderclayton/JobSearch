import { Router, Request, Response } from "express";
import { db } from "./config.js";
import { Application, IJob, IUser, Job, User } from "./models.js";
import mongoose, { Types } from "mongoose";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

router.post("/api/add_user", async (req: Request, res: Response) => {
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
});

router.post("/api/add_job", async (req: Request, res: Response) => {
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
});

router.post("/api/add_application", async (req: Request, res: Response) => {
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
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error adding application:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/api/update_user", async (req: Request, res: Response) => {
  try {
    const { _id, name, email, password, applicationId } = req.body;
    if (!_id) {
      return res.status(400).json({ message: "No user with that _id found" });
    }
    const updateFields: Partial<IUser> & {
      $push?: { applications: Types.ObjectId };
    } = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (password) updateFields.password = password;
    if (applicationId) updateFields.$push = { applications: applicationId };
    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      updateFields,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "Unable to update user" });
    }
    res.status(200).json(updatedUser);
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error:", errors });
    }
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/api/update_job", async (req: Request, res: Response) => {
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
});
