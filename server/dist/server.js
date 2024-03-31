import app from "./src/app/index.js";
import { db } from "./src/config.js";
const PORT = process.env.PORT || 5000;
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
