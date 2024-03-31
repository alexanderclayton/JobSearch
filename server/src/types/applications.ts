import { Types, Document } from "mongoose";

export type TFeedback = {
  feedback: boolean;
  date: Date;
  repName: string;
  repRole: string;
  interview: boolean;
  notes: string[];
};

export enum EFollowUpMethod {
  Email = "email",
  Phone = "phone",
  LinkedIn = "linkedin",
}

export type TFollowUp = {
  date: Date;
  method: EFollowUpMethod;
  message: string;
};

export interface IApplication extends Document {
  job: Types.ObjectId;
  applicationDate: Date;
  resume: File | null;
  coverLetter: File | null;
  feedback: TFeedback[];
  followUp: TFollowUp[];
  notes: string[];
}
