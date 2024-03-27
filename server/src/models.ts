import mongoose, { Schema, Types, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  applications: Types.ObjectId[];
}

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
  applications: {
    type: [Schema.Types.ObjectId],
    ref: "Application",
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);

export type TAddress = {
  street: string;
  city: string;
  state: string;
  zip: number;
};

const addressSchema = new Schema<TAddress>({
  street: String,
  city: String,
  state: String,
  zip: Number,
});

export type TCompany = {
  name: string;
  address: TAddress;
  companyType: string;
};

const companySchema = new Schema<TCompany>({
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

export enum ERate {
  Hourly = "hourly",
  Annual = "annual",
  None = "none",
}

export type TSalary = {
  amount: number;
  rate: ERate;
};

const salarySchema = new Schema<TSalary>({
  amount: Number,
  rate: {
    type: String,
    enum: Object.values(ERate),
  },
});

export type TCompensation = {
  salary: TSalary;
  benefits: string[];
};

const compensationSchema = new Schema<TCompensation>({
  salary: {
    type: salarySchema,
    _id: false,
  },
  benefits: {
    type: [String],
    default: [],
  },
});

export type TTech = {
  tech: string;
  qualified: boolean;
};

const techSchema = new Schema<TTech>({
  tech: {
    type: String,
    default: "",
  },
  qualified: {
    type: Boolean,
    default: false,
  },
});

export enum ELocation {
  Onsite = "onsite",
  Remote = "remote",
  Hybrid = "hybrid",
}

export interface IJob extends Document {
  user: Types.ObjectId;
  title: string;
  company: TCompany;
  compensation: TCompensation;
  hours: string;
  tech: TTech[];
  location: ELocation;
}

const jobSchema = new Schema<IJob>({
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
