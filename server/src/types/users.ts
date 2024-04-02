import { Types, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  jobs: Types.ObjectId[]
  applications: Types.ObjectId[];
}
