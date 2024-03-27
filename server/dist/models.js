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
// export type TFeedback = {
//   feedback: boolean;
//   date: Date;
//   repName: string;
//   interview: boolean;
//   notes: string[];
// };
// export enum EFeedbackMethod {
//   Email = "email",
//   Phone = "phone",
//   LinkedIn = "linkedin",
// }
// export type TFollowUp = {
//   date: Date;
//   method: EFeedbackMethod;
//   message: string;
// };
// export interface IApplication extends Document {
//   job: Types.ObjectId;
//   applicationDate: Date;
//   resume: File | null;
//   coverLetter: File | null;
//   feedback: TFeedback[];
//   followUp: TFollowUp[];
//   notes: string[];
// }
// const applicationSchema = new Schema<IApplication>({
//   job: {
//     type: Schema.Types.ObjectId,
//     ref: "Job",
//     required: true,
//   },
//   applicationDate: {
//     type: Date,
//     required: true,
//   },
//   resume: {
//     type: File,
//     default: null,
//   },
//   coverLetter: {
//     type: File,
//     default: null,
//   },
//   feedback: {
//     type: [
//       {
//         feedback: Boolean,
//         date: Date,
//         repName: String,
//         interview: Boolean,
//         notes: [String],
//       },
//     ],
//     default: [],
//   },
//   followUp: {
//     type: [
//       {
//         date: Date,
//         method: {
//           type: String,
//           enum: Object.values(EFeedbackMethod),
//         },
//         message: String,
//       },
//     ],
//     default: [],
//   },
//   notes: {
//     type: [String],
//     default: [],
//   },
// });
// export const Application = mongoose.model("Application", applicationSchema);
