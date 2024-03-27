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
export var ERate;
(function (ERate) {
    ERate["Hourly"] = "hourly";
    ERate["Annual"] = "annual";
})(ERate || (ERate = {}));
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
        name: {
            type: String,
            required: true,
        },
        address: {
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
        },
        type: {
            type: String,
            default: "",
        },
    },
    compensation: {
        salary: {
            amount: {
                type: Number,
                default: 0,
            },
            rate: {
                type: String,
                default: "",
            },
        },
        benefits: {
            type: [String],
            default: [],
        },
    },
    hours: {
        type: String,
        default: "",
    },
    tech: [
        {
            tech: {
                type: String,
                default: "",
            },
            qualified: {
                type: Boolean,
                default: false,
            },
        },
    ],
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
