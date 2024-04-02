import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    jobs: {
        type: [Schema.Types.ObjectId],
        ref: "Job",
        default: [],
    },
    applications: {
        type: [Schema.Types.ObjectId],
        ref: "Application",
        default: [],
    },
});
export const User = mongoose.model("User", userSchema);
