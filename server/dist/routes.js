import { Router } from "express";
import { db } from "./config.js";
import { Application, Job, User } from "./models.js";
export const router = Router();
router.get("/", (req, res) => {
    res.send("Hello World");
});
router.post("/hello", async (req, res) => {
    try {
        const name = req.body.name;
        const result = await db.collection("users").findOne({ name: name });
        if (result) {
            res.json(result);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error:", error);
    }
});
router.post("/api/add_user", async (req, res) => {
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
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
router.post("/api/add_job", async (req, res) => {
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
    }
    catch (error) {
        console.error("Error adding job:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
router.post("/api/add_application", async (req, res) => {
    try {
        const { userId, job, applicationDate, ...optionalFields } = req.body;
        if (!job || !applicationDate) {
            return res.status(400).json({
                message: "New application must include job and application date",
            });
        }
        else if (!userId) {
            return res
                .status(400)
                .json({ message: "Document must include a valid userId" });
        }
        const newApplication = new Application({
            job,
            applicationDate,
            ...optionalFields,
        });
        const savedApplication = await newApplication.save();
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $push: { applications: savedApplication._id } }, { new: true });
        if (!updatedUser) {
            return res.status(400).json({ message: "Unable to update user " });
        }
        res.status(201).json({ savedApplication, updatedUser });
    }
    catch (error) {
        console.error("Error adding application:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
