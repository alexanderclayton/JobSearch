import express from "express";
import cors from "cors";
import { router } from "./routes.js";
import { db } from "./config.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(router);
const startServer = async () => {
    try {
        await new Promise((resolve, reject) => {
            db.once("open", () => {
                resolve();
                console.log("Connected to MongoDB");
            });
            db.on("error", (error) => {
                reject(error);
            });
        });
        app.listen(PORT, () => {
            console.log(`API server is running at http://127.0.0.1:${PORT}`);
        });
    }
    catch (error) {
        console.error("Error sparking up server:", error);
    }
};
startServer();
