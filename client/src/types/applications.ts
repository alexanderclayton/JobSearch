export type TApplication = {
  _id?: string | undefined;
  userId: string | undefined;
  jobId: string;
  applicationDate: string;
  resume: File | null;
  coverLetter: File | null;
  feedback: TFeedback[];
  followUp: TFollowUp[];
  notes: string[];
  __v?: number;
};

export type TFeedback = {
  feedback: boolean;
  date: string;
  repName: string;
  repRole: string;
  interview: boolean;
  notes: string[];
};

export enum EFollowUpMethod {
  Email = "email",
  Phone = "phone",
  LinkedIn = "linkedin",
  None = "none",
}

export type TFollowUp = {
  date: string;
  method: EFollowUpMethod;
  message: string;
};
