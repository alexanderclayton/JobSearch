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
    applications: {
        type: [Schema.Types.ObjectId],
        ref: "Application",
        default: [],
    },
});
export const User = mongoose.model("User", userSchema);
const addressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zip: Number,
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
export var ERate;
(function (ERate) {
    ERate["Hourly"] = "hourly";
    ERate["Annual"] = "annual";
    ERate["None"] = "none";
})(ERate || (ERate = {}));
const salarySchema = new Schema({
    amount: Number,
    rate: {
        type: String,
        enum: Object.values(ERate),
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
export var ELocation;
(function (ELocation) {
    ELocation["Onsite"] = "onsite";
    ELocation["Remote"] = "remote";
    ELocation["Hybrid"] = "hybrid";
})(ELocation || (ELocation = {}));
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
    tech: [techSchema],
    location: {
        type: String,
        enum: Object.values(ELocation),
        default: ELocation.Onsite,
    },
});
export const Job = mongoose.model("Job", jobSchema);
const feedbackSchema = new Schema({
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
export var EFollowUpMethod;
(function (EFollowUpMethod) {
    EFollowUpMethod["Email"] = "email";
    EFollowUpMethod["Phone"] = "phone";
    EFollowUpMethod["LinkedIn"] = "linkedin";
})(EFollowUpMethod || (EFollowUpMethod = {}));
const followUpSchema = new Schema({
    date: Date,
    method: {
        type: String,
        enum: Object.values(EFollowUpMethod),
    },
    message: String,
});
const applicationSchema = new Schema({
    job: {
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
