import mongoose, { Schema } from "mongoose";
import { ELocation, ERate, } from "../types/index.js";
const addressSchema = new Schema({
    street: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    zip: {
        type: Number,
        default: 0,
    },
});
const companySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: addressSchema,
        default: { street: "", city: "", state: "", zip: 0 },
        _id: false,
    },
    companyType: {
        type: String,
        default: "",
    },
});
const salarySchema = new Schema({
    amount: Number,
    rate: {
        type: String,
        enum: Object.values(ERate),
        default: ERate.None,
    },
});
const compensationSchema = new Schema({
    salary: {
        type: salarySchema,
        _id: false,
    },
    benefits: {
        type: [String],
        default: [],
    },
});
const techSchema = new Schema({
    tech: {
        type: String,
        default: "",
    },
    qualified: {
        type: Boolean,
        default: false,
    },
});
const jobSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    company: {
        type: companySchema,
        required: true,
        _id: false,
    },
    compensation: {
        type: compensationSchema,
        default: { salary: { amount: 0, rate: ERate.None }, benefits: [] },
        _id: false,
    },
    hours: {
        type: String,
        default: "",
    },
    tech: {
        type: [techSchema],
        _id: false,
    },
    location: {
        type: String,
        enum: Object.values(ELocation),
        default: ELocation.Onsite,
    },
});
export const Job = mongoose.model("Job", jobSchema);
