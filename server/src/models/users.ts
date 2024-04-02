import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/index.js";

const userSchema = new Schema<IUser>({
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
