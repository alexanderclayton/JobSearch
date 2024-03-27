import { Router } from "express";
import { db } from "./config.js";
import { User } from "./models.js";
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
