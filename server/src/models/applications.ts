import mongoose, { Schema } from "mongoose";
import {
  EFollowUpMethod,
  IApplication,
  TFeedback,
  TFollowUp,
} from "../types/index.js";

const feedbackSchema = new Schema<TFeedback>({
  feedback: Boolean,
  date: Date,
  repName: String,
  repRole: {
    type: String,
    default: "",
  },
  interview: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: [String],
    default: [],
  },
});

const followUpSchema = new Schema<TFollowUp>({
  date: Date,
  method: {
    type: String,
    enum: Object.values(EFollowUpMethod),
  },
  message: String,
});

const applicationSchema = new Schema<IApplication>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicationDate: {
    type: Date,
    required: true,
  },
  resume: {
    type: Buffer,
    default: null,
  },
  coverLetter: {
    type: Buffer,
    default: null,
  },
  feedback: {
    type: [feedbackSchema],
    default: [],
  },
  followUp: {
    type: [followUpSchema],
    default: [],
  },
  notes: {
    type: [String],
    default: [],
  },
});

export const Application = mongoose.model("Application", applicationSchema);
