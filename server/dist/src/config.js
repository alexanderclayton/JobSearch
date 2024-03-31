import mongoose from "mongoose";
import "dotenv/config";
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI, {
    dbName: "jobsearch",
});
export const db = mongoose.connection;
